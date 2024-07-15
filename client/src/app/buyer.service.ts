import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buyer } from './buyer';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private url = 'http://localhost:5200';
  buyers$ = signal<Buyer[]>([]);
  buyer$ = signal<Buyer>({} as Buyer);
 
  constructor(private httpClient: HttpClient) { }

  private refreshBuyers() {
    this.httpClient.get<Buyer[]>(`${this.url}/buyer`)
      .subscribe(buyers => {
        this.buyers$.set(buyers);
      });
  }

  getBuyers() {
    this.refreshBuyers();
    return this.buyers$();
  }

  getBuyer(id: string) {
    this.httpClient.get<Buyer>(`${this.url}/buyer/${id}`).subscribe(buyer => {
      this.buyers$.set(buyer);
      return this.buyer$();
    });
  }

  createBuyer(buyer: Buyer) {
    return this.httpClient.post(`${this.url}/buyer`, buyer, { responseType: 'text' });
  }

  updateBuyer(id: string, buyer: Buyer) {
    return this.httpClient.put(`${this.url}/buyer/${id}`, buyer, { responseType: 'text' });
  }

  deleteBuyer(id: string) {
    return this.httpClient.delete(`${this.url}/buyer/${id}`, { responseType: 'text' });
  }
}