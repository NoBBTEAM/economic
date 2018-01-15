import { NgModule } from '@angular/core';
import { MacroscopicComponent } from './macroscopic.component';
import { SharedModule } from '../../shared/shared.module';
import { MacroscopicRoutingModule } from './macroscopic-routing/macroscopic-routing.module';
import { EconomicComponent } from './economic/economic.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MacEconomicGdpComponent } from './economic/mac-economic-gdp/mac-economic-gdp.component';
import { MacEconomicPillarComponent } from './economic/mac-economic-pillar/mac-economic-pillar.component';
import { MacEconomicInvestComponent } from './economic/mac-economic-invest/mac-economic-invest.component';
import { MacEconomicBudgetComponent } from './economic/mac-economic-budget/mac-economic-budget.component';
import { MacEconomicExpendComponent } from './economic/mac-economic-expend/mac-economic-expend.component';
import { MacEconomicIncomeComponent } from './economic/mac-economic-income/mac-economic-income.component';

@NgModule({
  imports: [
    SharedModule,
    MacroscopicRoutingModule
  ],
  declarations: [
    MacroscopicComponent,
    EconomicComponent,
    ForecastComponent,
    MacEconomicGdpComponent,
    MacEconomicPillarComponent,
    MacEconomicInvestComponent,
    MacEconomicBudgetComponent,
    MacEconomicExpendComponent,
    MacEconomicIncomeComponent
  ]
})
export class MacroscopicModule { }
