import { Component, OnInit, } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-lookup',
    imports: [RouterOutlet],
    templateUrl: './lookup.component.html',
    styleUrl: './lookup.component.scss'
})
export class LookupComponent implements OnInit {

    constructor() {
        console.log("logged lookup component");
    }

    ngOnInit(): void {
        console.log("lookup component called");
    }
}
