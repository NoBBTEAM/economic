import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MacEconomicRoutingModule } from './mac-economic-routing/mac-economic-routing.module';
import { MacEconomicBudgetComponent } from './mac-economic-budget/mac-economic-budget.component';
import { MacEconomicExpendComponent } from './mac-economic-expend/mac-economic-expend.component';
import { MacEconomicGdpComponent } from './mac-economic-gdp/mac-economic-gdp.component';
import { MacEconomicIncomeComponent } from './mac-economic-income/mac-economic-income.component';
import { MacEconomicInvestComponent } from './mac-economic-invest/mac-economic-invest.component';
import { MacEconomicPillarComponent } from './mac-economic-pillar/mac-economic-pillar.component';
import { MacEconomicComponent } from './mac-economic.component';

@NgModule({
  imports: [
    SharedModule,
    MacEconomicRoutingModule
  ],
  declarations: [
    MacEconomicComponent,
    MacEconomicBudgetComponent,
    MacEconomicExpendComponent,
    MacEconomicGdpComponent,
    MacEconomicIncomeComponent,
    MacEconomicInvestComponent,
    MacEconomicPillarComponent,
  ]
})
export class MacEconomicModule { }