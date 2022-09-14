# 强化练习2

1. 给一段文章中的全部指定词语进行过滤

   ```javascript
   // 比如我要过滤 "NH"
   
   var str = 'asdasdNHasdasdasdNHsdasdasdNHsadasd'
   
   // 需要结果
   // asdasd**asdasdasd**sdasdasd**
   ```

2. 反转字符串

   ```javascript
   var str = 'abcdefg'
   
   // 要求结果
   // gfedcba
   ```

3. 统计字符串中每个字符的个数？

   ```javascript
   var str = 'abcdacbabcbababcbabcabd'
   
   // 结果
   // { a: 出现次数， b: 出现次数, ...}
   ```

   # 强化练习3

1. aabccd 统计每个字符出现的次数，去掉重复的字符，使结果显示 abcd

2. 编写函数，判断一个字符串是否是 “可回文字符串”

   - 可回文字符串： 正着和反着一样
   - 例如： `abcba` / `上海自来水来自海上` 
   
   - 返回值是布尔值

   