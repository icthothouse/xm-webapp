import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'xm-navbar-toggle-widget',
    template: `
        <div class="sidbar-toggle">
            <button (click)="sidebarToggle()"
                    class="navbar-toggler btn btn-icon btn-just-icon btn-link btn-no-ripple"
                    mat-icon-button
                    type="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
            </button>
        </div>
    `,
    styleUrls: ['./xm-navbar-toggle-widget.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class XmNavbarToggleWidget implements OnInit {
    protected mobileMenuVisible: boolean = false;
    private toggleButton: HTMLElement;
    private sidebarVisible: boolean;

    constructor(
        private element: ElementRef,
    ) {
        this.sidebarVisible = false;
    }

    public ngOnInit(): void {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    }

    public sidebarToggle(): void {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    // TODO: refactor
    public sidebarOpen(): void {
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(() => {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        setTimeout(() => {
            $toggle.classList.add('toggled');
        }, 430);

        const $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');

        if (body.querySelectorAll('.main-panel')) {
            document.getElementsByClassName('main-panel')[0].appendChild($layer);
        } else if (body.classList.contains('off-canvas-sidebar')) {
            document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
        }

        setTimeout(() => {
            $layer.classList.add('visible');
        }, 100);

        $layer.onclick = (() => {
            body.classList.remove('nav-open');
            this.mobileMenuVisible = false;
            this.sidebarVisible = false;

            $layer.classList.remove('visible');
            setTimeout(() => {
                $layer.remove();
                $toggle.classList.remove('toggled');
            }, 400);
        }).bind(this);

        body.classList.add('nav-open');
        this.mobileMenuVisible = true;
        this.sidebarVisible = true;
    }

    // TODO: refactor
    public sidebarClose(): void {
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        const $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');

        this.sidebarVisible = false;
        body.classList.remove('nav-open');
        if ($layer) {
            $layer.remove();
        }

        setTimeout(() => {
            $toggle.classList.remove('toggled');
        }, 400);

        this.mobileMenuVisible = false;
    }

}
