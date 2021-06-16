# AlgorithmQuestions

アルゴリズムに関するインタビュー

## Sample Theme (Standard)

* 配列（検索、追加、削除）
  * 非ソート済配列
  * ソート済配列
  * 単方向・双方向リンクリスト
  * ハッシュテーブル

* 二分木
  * 非平衡二分探索木の検索、追加操作
  * ヒープのpush, peek, pop(bubble up, bubble down)
  * スタックとキュー
  * 関数の再帰呼び出しを明示的なスタックを使って書き換える記法
  * トライ木
  * 赤黒木

* ソート（実装、時間計算量、空間計算量）
  * 挿入ソート、バブルソート、クイックソート、マージソート

* 文字列
  * 文字列検索（力技、KMP法、BM法）

* 探索
  * バイナリサーチ
  * グラフのDFS/BFS
  * ダイクストラ法、primのアルゴリズム (priority queueを使うと計算量オーダーが変わる)
  * 動的計画法 (文字列の編集距離)

## Sample Theme (Advance)

* ハッシュテーブルの衝突対策(open address、chain)
  * ReハッシュするかNodeでつなげるか

* 平衡二分探索木の実装
* timsort: Pythonを使っているとき、2つのソートされた配列を連結してsort()するとO(N)時間でソートできる
* ヒープの初期化 (なぜO(N)時間か答えられるようにすること)
* Kruskalのアルゴリズム(union-find)、Floyd-Warshall、Bellman-Ford
