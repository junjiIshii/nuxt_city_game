# city_game開発仕様書

## ページ構成
ページの全体の構成は以下の様にする。

```
index
    |-game
    |-tutorial
    |   |-tutorial_1
    |   |-turorial_2
    |   ...
    |
    |-document
    |   |-abstract
    |   |-basic
    |   |-geomap
    |   |-city
    |   |-buildings
    |   |-resource
    |   |-traffic
    |   |-budgets
    |   |-others
    |   |-help
    |   |-news
    |
    |-credits
        >my site
        >github
```

### index
game,tutorial,document,config,creditsにつなげるためのページ。indexページ。

リンクコンポーネント
- ゲームをする =>./game
- チュートリアル =>./tutorial
- 説明書 =>./document
- クレジット =>./credits

### game
ゲームを進行させるためのページ。「game.md」にて細かい流れを説明。

### tutorial
配下チュートリアルページの概要とチュートリアルのページを列挙する一覧ページ。

リンクコンポーネント
- それぞれのチュートリアルページ => ./tutorial_n
- トップへ戻る　=> /

#### tutorial_n
gameと同じだが、チュートリアル用の進行をする様に設計してある。

### document
説明書のページ。それぞれの内容をページに分ける予定

リンクコンポーネント
- 配下の説明書ページ => ./any
- トップへ戻る => /

#### abstract
ゲームの概要、勝利条件、敗北条件について。

#### basic
基本的なゲームの流れ、操作方法、画面の見方について

#### geomap
geoモード（国全体）を見るMapでの操作方法と各種コマンドについて

#### city
一つの町単位での操作方法について。

#### buildings
町で建てることができる建物についての説明。

#### traffic
物流に関する操作方法と説明

#### budgets
税金に関する操作方法と説明。また全体の財政に関する説明

#### others
上記では賄いきれなかった細かい説明について。

#### help
攻略情報を少しだけ載せておく

#### news
更新情報を載せる

### credits
ゲームの開発情報、製作者、リポジトリへのリンクを貼る。

リンクコンポーネント
- トップへ戻る　=> /
- github => githublink
- my site => https://jun-app.com





