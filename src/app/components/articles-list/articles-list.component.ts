import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  articles = [];
  articlesSubscription: Subscription;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    // load index article (there's articles list)
    this.articlesService.get('index');
    this.articlesSubscription = this.articlesService.data.subscribe(data => {
      if (data && data['index']) {
        this.articles = data['index'].articles;
        console.log('articles', this.articles);
      }
    });
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
