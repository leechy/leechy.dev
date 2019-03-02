import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  articleId: string;
  article: any;
  articlesSubscription: Subscription;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService) {}

  ngOnInit() {
    this.articleId = UtilityService.findRouteParam(this.route.snapshot, 'articleId');

    if (this.articleId) {
      this.articlesService.get(this.articleId);
      this.articlesSubscription = this.articlesService.data.subscribe(data => {
        if (data && data[this.articleId]) {
          this.article = data[this.articleId];
          console.log('article', this.article);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
