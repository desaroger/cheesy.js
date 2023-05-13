<template>
      <table border="0" cellPadding="0"  class="center black-starts">
        <tbody>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
          <tr>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
            <td>cell</td>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {
  name: 'Game'
}
</script>

<style lang="scss">
.game {

  // width: 100%;
  // height: 0;
  // padding-bottom: 100%;

  // background-image: url('~assets/board.svg');
  // background-size: 100%;

  
}

table{
    width: 50vh;
    height: 50vh;
  border-collapse: collapse;
}

table,tr,td {
  border: 1px solid black;
}
table td {
  vertical-align: middle;
  text-align: center !important;
}
table.center {
    margin:auto;
  }




table.black-starts {
  tr:nth-of-type(even) td:nth-of-type(odd),tr:nth-of-type(odd) td:nth-of-type(even){
    background-color:white;
  }
  tr:nth-of-type(even) td:nth-of-type(even),
  tr:nth-of-type(odd) td:nth-of-type(odd)
  {
   background-color:rgb(104, 104, 104);
  }
}
table.white-starts {
  tr:nth-of-type(even) td:nth-of-type(odd),tr:nth-of-type(odd) td:nth-of-type(even){
    
   background-color:rgb(104, 104, 104);
  }
  tr:nth-of-type(even) td:nth-of-type(even),
  tr:nth-of-type(odd) td:nth-of-type(odd)
  {
    background-color:white;
  }
}
</style>
