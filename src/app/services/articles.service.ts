import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  public data: BehaviorSubject<{ [id: string]: any }> = new BehaviorSubject(null);

  constructor(private afStore: AngularFirestore, private afStorage: AngularFireStorage) {}

  /**
   * Retrieve all articles from the collection
   * Retrieve the logo urls
   * Add everything to `data` subject
   */
  list() {
    this.afStore
      .collection('articles')
      .get()
      .subscribe(querySnapshot => {
        const newArticles = {};
        querySnapshot.forEach(doc => {
          newArticles[doc.id] = doc.data();
        });
        this.data.next({ ...this.data.value, ...newArticles });
      });
  }

  /**
   * Retrieve data for a single article by its ID
   * and puts it to the data subject
   *
   * @param articleId  Article Id
   * @param force      Update local data
   */
  get(articleId: string, force?: boolean) {
    if (force || !this.data.value || !this.data.value[articleId]) {
      this.afStore
        .collection('articles')
        .doc(articleId)
        .get()
        .subscribe(doc => {
          const newArticle = doc.data();
          const articles = this.data.value || {};
          this.data.next({
            ...articles,
            [articleId]: { ...articles[articleId], ...newArticle }
          });
        });
    }
  }

  /**
   * Creates new article
   * TODO: update index article
   *
   * @param data  new Article data
   */
  create(data: any) {
    const id = this.afStore.createId();
    data.id = id;
    return this.afStore
      .collection('articles')
      .doc(id)
      .set(data)
      .then(res => {
        this.get(id, true);
      });
  }

  /**
   * Updates existing article
   *
   * @param id    Id of the Article to be updated
   * @param data  Updated data (keys that needs to be updated)
   */
  update(id: string, data: any) {
    return this.afStore
      .collection('articles')
      .doc(id)
      .update(data)
      .then(res => {
        this.get(id, true);
      });
  }

  /**
   * Deletes article... not sure I need such a method
   * TODO: create method logic
   *
   * @param id  Id of the Article to be deleted
   */
  delete(id: string) {
    //
  }
}
