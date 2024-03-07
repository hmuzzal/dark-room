import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  navButtonClick = new EventEmitter<void>();

  constructor() {}
}
