# Please find below my answer to Part A of the assessment

One could say this function is not the most efficient, specifically if we pass a very large string. Since we execute multiple for loops where we traverse the entire string, time complexity is O(n+n) or O(n), but could be faster with a single iteration. Further, since we create an extraneous copy of the string, r, space complexity is O(n) but we can achieve O(1).

An initial approach might be using something like `s.reverse()`, but that wouldn’t improve our performance as we’d still be traversing the entirety of s, and still creating a copy. 

If we think about a palindrome, like `racecar`, we notice a symmetrical pattern. You can visualize this word being folded in half at the center with each side’s character matching up. So, we could use this pattern to only iterate less than `len(s)` number of times. A two-pointer approach, where we traverse start-to-end and end-to-start simultaneously could work here. If at any point the symmetrical pairs’ values don’t match, we know the string is not a palindrome, and we can bail out of the check. 

The benefits include eliminating extraneous copies of variables, executing less iterations (implement a counter and see it runs less than `len(s)` times), and a single while loop. A tradeoff is that we could be prematurely optimizing for a large string we may never encounter, but this isn’t a huge change with respect to code, and it doesn't require any additional infrastructure or overhead.

```
def is_palindrome(s): 
    i=0
    j=len(s)-1

    while i<j:
        if(s[i] != s[j]):
        return False
    i+=1
    j-=1    

    return True
```
