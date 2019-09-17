import { Injectable, NgModule } from '@angular/core';
import { Http } from '@angular/http';


@NgModule({
    imports: []
})
@Injectable()
export class ApiService {

    constructor(private http: Http) { }

    getFoodCategories() {
        return this.http.get(
            `http://temp.dash.zeta.in/food.php`
        );
    }

}
