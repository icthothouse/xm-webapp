import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { XmDynamicModule } from '@xm-ngx/dynamic';

import { XmSharedModule } from '../../../shared/shared.module';
import { ClockWidgetComponent } from '../clock-widget/clock-widget.component';
import { ExchangeWidgetComponent } from '../exchange-widget/exchange-widget.component';
import { FinanceService } from '../exchange-widget/finance.service';
import { IframeWidgetComponent } from '../iframe-widget/iframe-widget.component';
import { MdWidgetComponent } from '../md-widget/md-widget.component';
import { FeedService } from '../news-widget/feed.service';
import { NewsWidgetComponent } from '../news-widget/news-widget.component';
import { SignInUpWidgetComponent } from '../sign-in-up-widget/sign-in-up-widget.component';
import { TwitterTimelineWidgetComponent } from '../twitter-timeline-widget/twitter-timeline-widget.component';
import { TwitterTimelineService } from '../twitter-timeline-widget/twitter-timeline.service';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';
import { WeatherService } from '../weather-widget/weather.service';
import { WelcomeWidgetComponent } from '../welcome-widget/welcome-widget.component';

@NgModule({
    imports: [
        CommonModule,
        XmSharedModule,
        HttpClientJsonpModule,
        XmDynamicModule.forChild([
            { selector: 'xm-widget-clock', loadChildren: () => ClockWidgetComponent },
            { selector: 'xm-widget-exchange-calculator', loadChildren: () => ExchangeWidgetComponent },
            { selector: 'xm-widget-iframe', loadChildren: () => IframeWidgetComponent },
            { selector: 'xm-widget-md', loadChildren: () => MdWidgetComponent },
            { selector: 'xm-widget-news', loadChildren: () => NewsWidgetComponent },
            { selector: 'xm-widget-sign-in-up', loadChildren: () => SignInUpWidgetComponent },
            { selector: 'xm-widget-twitter-timeline', loadChildren: () => TwitterTimelineWidgetComponent },
            { selector: 'xm-widget-weather', loadChildren: () => WeatherWidgetComponent },
            { selector: 'xm-widget-welcome', loadChildren: () => WelcomeWidgetComponent },
        ]),
        CovalentTextEditorModule,
    ],
    declarations: [
        ClockWidgetComponent,
        ExchangeWidgetComponent,
        IframeWidgetComponent,
        MdWidgetComponent,
        NewsWidgetComponent,
        SignInUpWidgetComponent,
        TwitterTimelineWidgetComponent,
        WeatherWidgetComponent,
        WelcomeWidgetComponent,
    ],
    providers: [
        FeedService,
        FinanceService,
        TwitterTimelineService,
        WeatherService,
    ],
})
export class ExtCommonModule {
}
