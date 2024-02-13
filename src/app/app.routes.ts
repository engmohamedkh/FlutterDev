import { Routes } from '@angular/router';
import { HotpostComponent } from './Components/hotpost/hotpost.component';
import { NewpostComponent } from './Components/newpost/newpost.component';
import { RisingpostComponent } from './Components/risingpost/risingpost.component';
import { ErrorComponent } from './Components/error/error.component';

export const routes: Routes = [
    {path:"",component:HotpostComponent},
    {path:"hotposts",component:HotpostComponent},
    {path:"newposts",component:NewpostComponent},
    {path:"risingposts",component:RisingpostComponent},
    {path:"**",component:ErrorComponent},
];
