
function App(){
  var file;
  let req = new XMLHttpRequest();
  req.open('POST','https://elevate-be-staging.azurewebsites.net/best-of-luck.php',true);
  req.onreadystatechange = function(){
      if(req.readyState==4 && req.status==200){
        file=JSON.parse(JSON.parse(req.responseText));

        console.log(file)
        var array=[];
        var arraylen = Object.keys(file).length;

        for(var i=0;i<arraylen;i++){
          for(var j=i+1;j<arraylen;j++){
            if(file[i].subject_code==file[j].subject_code){
              if(file[i].source=='regular' && file[j].source!='regular'){
                array.push(i);
              }
              if(file[i].source!='regular' && file[j].source=='regular'){
                array.push(j);
              }
            }   
          }
        }

      var end=[];
      var bool=false;
      for(var i=0;i<arraylen;i++){
        bool=false;
        for(var j=0;j<arraylen;j++){
          if(i==array[j]){
            bool=true;
          }
        }
        if(bool==true){
            continue;
        }
        else{
          end.push(file[i]);
        }
      }
      var reflen = Object.keys(end).length;

      // subject

      document.getElementById("dept").innerHTML+='<option class="dropdown-header disabled">select</option>'
      for(var i=0;i<reflen;i++){
        document.getElementById("dept").innerHTML+='<option id='+end[i].subject_code +' value='+end[i].subCode_dept_sem+'>'+ end[i].subject_code +" - " + end[i].subject_name + " ("+ end[i].subCode_dept_sem+") " + '</option>';
      }
      
      console.log(end);
    }
  }
  
  req.send();
}
