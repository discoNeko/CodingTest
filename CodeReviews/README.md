# CodeReviews

受験者と共に以下の内容を行う。

* 短いコードを読んでもらい、挙動を説明してもらう
* 問題点（意図しない挙動）の指摘
* 問題を解消するための追加実装
* 処理を汎用的にするための提案

各問題の設問は共通（Q1〜Q4）。出題コードは JavaScript だが、扱うテーマは言語を問わず通用するものを選んでいる。
進め方と評価基準は [InterviewGuide](../InterviewGuide/README.md) を参照。

## 出題一覧

| 問題 | テーマ | 難易度 | 想定時間 |
|---|---|---|---|
| [OffByOne](OffByOne/) | 配列の範囲外アクセス | ★ | 15分 |
| [NumberToBoolean](NumberToBoolean/) | 数値を真偽値として扱う | ★ | 15分 |
| [DefaultSort](DefaultSort/) | ソートの既定の比較順序 | ★ | 15分 |
| [MutatingArguments](MutatingArguments/) | 浅いコピーと引数の破壊的変更 | ★★ | 15〜20分 |
| [FloatingPoint](FloatingPoint/) | 浮動小数点の誤差と端数処理 | ★★ | 15〜20分 |
| [Complexity](Complexity/) | 計算量 | ★★ | 15〜20分 |
| [AsyncLoop](AsyncLoop/) | 非同期処理の待ち合わせ | ★★★ | 20分 |

## ファイル構成

```
<問題名>/
  README.md    テーマ・難易度（受験者には見せない）
  sample1.js   出題コード（受験者に共有する）
  ANSWER.md    想定解答・加点ポイント・深掘り質問
```
