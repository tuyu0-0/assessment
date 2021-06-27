'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した HTML 要素の子どもを全て削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
  while(element.firstChild){
    //子どもの要素がある限り削除
    element.removeChild(element.firstChild);
  }
}
 /* function という無名関数は、代わりに => と書いても機能し、
  この機能のことをアロー関数と呼びます。*/
  assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する(この処理をガード句という)
      return;
    }
  
    removeAllChildren(resultDivided);//診断表示エリアの子どもの要素を全て削除
    const header = document.createElement('h3');//定数headerの宣言(headerはhタグのこと)
    header.innerText = '診断結果';//hタグの中の文章
    resultDivided.appendChild(header);
  
    const paragraph = document.createElement('p');//定数のparagraphの宣言（paragraphはpタグのこと）
    const result = assessment(userName);
    paragraph.innerText = result;//pタグの中に名前を渡したときの診断結果を入れる
    resultDivided.appendChild(paragraph);
  
    //⬇︎Twitterへ飛んで、診断結果を呟くためのコード⬇︎
    removeAllChildren(tweetDivided);//ツイートエリアの子どもの要素を全て削除
    const anchor = document.createElement('a');//定数anchorの宣言(anchorはaタグのこと)
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';//classNameはclassのid
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ診断';
    tweetDivided.appendChild(anchor);
  
     //⬇︎上のコード＋Twitterボタンを追加するためのコード⬇︎
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
  };
userNameInput.onkeydown = event => {
  if(event.key === 'Enter'){
  assessmentButton.onclick();
  }
}


  const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];
 /*TODO 1/65536の乱数生成
 let num = Math.floor(Math.random()*65537);
　console.log(num);
　TODO for文で1/65536の１であるか否かを真偽して、真であるときの処理。*/

/**
 *　名前の文字列をパラメーターとして渡すと、診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
     sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字コード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}', userName);
   //TODO if文である特定の名前の時だけ診断結果が変わる様にする
    return result; //診断結果
}

//テスト
console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎')　=== assessment('太郎'),
    '入力された名前が同じなら同じ診断結果を出力する時の処理が正しくありません。'
);
