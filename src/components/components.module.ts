import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { TakeMeComponent } from './take-me/take-me';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { PickupCarComponent } from './pickup-car/pickup-car';
import { DestinationAddressComponent } from './destination-address/destination-address';


@NgModule({
	declarations: [MapComponent,
    TakeMeComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddressComponent,
    
    ],
	imports: [],
	exports: [MapComponent,
    TakeMeComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddressComponent,
    
    ]
})
export class ComponentsModule {}
