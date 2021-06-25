import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ExportConfig } from '@xm-ngx/administration/maintenance/export-entities-details/export-entities-details.component';
import {
    ExportEntitiesService,
    ExportEntityFlatNode,
    ExportEntityItemNode
} from '@xm-ngx/administration/maintenance/export-entities.service';

@Component({
    selector: 'xm-export-tree',
    templateUrl: './export-tree.component.html',
    providers: [ExportEntitiesService]
})
export class ExportTreeComponent implements OnDestroy {

    @Input() public set selectedSpec(spec: ExportConfig) {
        this.currentSpec = spec;
        if (spec && spec.treeModel) {
            this.exportEntitiesService.initialize(spec.treeModel);
        }
    }
    @Output() public nodesSelected: EventEmitter<unknown> = new EventEmitter<unknown>();

    public currentSpec: ExportConfig;

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    public flatNodeMap: Map<ExportEntityFlatNode, ExportEntityItemNode> =
        new Map<ExportEntityFlatNode, ExportEntityItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    public nestedNodeMap: Map<ExportEntityItemNode, ExportEntityFlatNode> =
        new Map<ExportEntityItemNode, ExportEntityFlatNode>();

    /** A selected parent node to be inserted */
    public selectedParent: ExportEntityFlatNode | null = null;
    public treeControl: FlatTreeControl<ExportEntityFlatNode>;
    public treeFlattener: MatTreeFlattener<ExportEntityItemNode, ExportEntityFlatNode>;
    public dataSource: MatTreeFlatDataSource<ExportEntityItemNode, ExportEntityFlatNode>;

    /** The selection for checklist */
    public checklistSelection: SelectionModel<ExportEntityFlatNode> =
        new SelectionModel<ExportEntityFlatNode>(true /* multiple */);

    constructor(private exportEntitiesService: ExportEntitiesService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<ExportEntityFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.exportEntitiesService.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    public getLevel: (node: ExportEntityFlatNode) => number  = (node: ExportEntityFlatNode) => node.level;
    public isExpandable: (node: ExportEntityFlatNode) => boolean = (node: ExportEntityFlatNode) => node.expandable;
    public getChildren: (node: ExportEntityItemNode) => ExportEntityItemNode[] = (node: ExportEntityItemNode): ExportEntityItemNode[] => node.children;
    public hasChild: (_: number, _nodeData: ExportEntityFlatNode) => boolean = (_: number, _nodeData: ExportEntityFlatNode) => _nodeData.expandable;
    public hasNoContent: (_: number, _nodeData: ExportEntityFlatNode) => boolean = (_: number, _nodeData: ExportEntityFlatNode) => _nodeData.item === '';
    public transformer: (node: ExportEntityItemNode, level: number) => ExportEntityFlatNode = (node: ExportEntityItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item
            ? existingNode
            : new ExportEntityFlatNode();
        flatNode.item = node.item;
        flatNode.level = level;

        flatNode.expandable = !!node.children?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    public ngOnDestroy(): void {
        this.exportEntitiesService.dataChange.unsubscribe();
    }

    public descendantsAllSelected(node: ExportEntityFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.length > 0 && descendants.every(child => {
            return this.checklistSelection.isSelected(child);
        });
        return descAllSelected;
    }

    public descendantsPartiallySelected(node: ExportEntityFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    public itemSelectionToggle(node: ExportEntityFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.forEach(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(node);
        this.triggerSelectionChange();
    }

    public leafItemSelectionToggle(node: ExportEntityFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
        this.triggerSelectionChange();
    }

    public checkAllParentsSelection(node: ExportEntityFlatNode): void {
        let parent: ExportEntityFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    public checkRootNodeSelection(node: ExportEntityFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.length > 0 && descendants.every(child => {
            return this.checklistSelection.isSelected(child);
        });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    public getParentNode(node: ExportEntityFlatNode): ExportEntityFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }


    private triggerSelectionChange(): void {
        const specKey = this.currentSpec.key;
        const selection: ExportEntityFlatNode[] = [];
        this.checklistSelection.selected.forEach(s => {
            let selected = {...s}
            const parent = this.getParentNode(s);
            if (parent) {
                selected = {...selected, parent}
            }
            selection.push(selected);
        });
        this.nodesSelected.emit({specKey, selection});
    }
}
