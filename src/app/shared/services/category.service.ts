import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): FirebaseListObservable<Category[]> {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
