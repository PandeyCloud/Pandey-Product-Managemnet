import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';

import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {

    constructor(private producteService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id = route.paramMap.get('id');
        if (isNaN(+id)) {
            const message = `Product id was not a number: ${id}`;
            console.error(message);
            return of({ product: null, error: message });
        }
        return this.producteService.getProduct(+id)
            .pipe(
                map(product => ({ product: product })),
                catchError(error => {
                    const errorMessage = `Retrieval error ${error}`;
                    console.error(errorMessage);
                    return of({ product: null, error: errorMessage });
                })
            );
    }

}