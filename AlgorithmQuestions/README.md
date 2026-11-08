# AlgorithmQuestions

アルゴリズムに関するインタビュー

問題文と解答方針は言語に依存しない書き方にしている。参考実装は JavaScript だが、受験者は好きな言語で解いてよい。
進め方と評価基準は [InterviewGuide](../InterviewGuide/README.md) を参照。

## カテゴリ一覧

| カテゴリ | 詳細のある問題 |
|---|---|
| [Array](Array/README.md) | [MissingNumber](Array/MissingNumber.md) ★、[PairsWithSum](Array/PairsWithSum.md) ★★ |
| [LinkedList](LinkedList/README.md) | [FindMiddle](LinkedList/FindMiddle.md) ★、[DetectCycle](LinkedList/DetectCycle.md) ★★ |
| [String](String/README.md) | [Anagram](String/Anagram.md) ★、[IsRotation](String/IsRotation.md) ★★ |
| [BinaryTree](BinaryTree/README.md) | [CountLeaves](BinaryTree/CountLeaves.md) ★、[InorderIterative](BinaryTree/InorderIterative.md) ★★ |
| [StackQueue](StackQueue/README.md) | [ValidParentheses](StackQueue/ValidParentheses.md) ★、[QueueWithStacks](StackQueue/QueueWithStacks.md) ★★ |
| [Sort](Sort/README.md) | [MergeSort](Sort/MergeSort.md) ★★、[QuickSort](Sort/QuickSort.md) ★★ |
| [Search](Search/README.md) | [BinarySearch](Search/BinarySearch.md) ★、[GridShortestPath](Search/GridShortestPath.md) ★★ |
| [DynamicProgramming](DynamicProgramming/README.md) | [ClimbingStairs](DynamicProgramming/ClimbingStairs.md) ★、[EditDistance](DynamicProgramming/EditDistance.md) ★★★ |
| [Misc](Misc/README.md) | - |

各カテゴリの README に、詳細のない問題も含めた一覧（難易度・目標計算量）がある。

詳細ページの構成: 問題 / 入出力例 / ヒント（段階的に出す） / 解答方針と計算量 / 参考実装 / 深掘り質問

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
