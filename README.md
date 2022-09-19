# csv-parser-creator
Creates parsers from CSV files

 <br>
 
# Example 

<br>

### <u>Sample input</u>

  | A   | B   | C   | out |
  | --- | --- | --- | --- |
  | 0   | 0   | 0   | A   |
  | 0   | 0   | 1   | B   |
  | 0   | 1   | 0   | C   |
  | 0   | 1   | 1   | D   |
  | 1   | 0   | 0   | E   |
  | 1   | 0   | 1   | F   |
  | 1   | 1   | 0   | G   |
  | 1   | 1   | 1   | H   |

  <br>
  <br>

### <u>Sample created parser</u>
 
                         option    
                    /              \
                   0                1
                /     \          /     \
               0       1        0       1
              / \     / \      / \     / \
             0   1   0   1    0   1   0   1
             |   |   |   |    |   |   |   |
             A   B   C   D    E   F   G   H
