// imported key for api to make it diployment ready


    const base = 320;
    const key ="qsdfvbnm456nwe6r87ejnsjdkasdk"
    darkmode=false;
    idd=["base","select_state","select_details"]
    idw=["text1","text2","text3","text4","1","2","3","4","5","6","7","8","9","10","0","pt1","pt2","scale"]


    function max(arr) {
        var max = -Infinity
        for (i = 0; i < arr.length; i++) {
            if (Math.abs(arr[i]) > max) {
                max = Math.abs(arr[i])
            }
        }
        return max;
    }









    function createGraph(arr_value, ab = "") {

        // console.log(arr_value)
        document.getElementById(ab + "base").style.display = "block";
       

        dis = 325
        for (i = 0; i <= 10; i++) {
          
            bt = document.getElementById(ab + i.toString()).setAttribute("y", dis)
            line_dis = dis - 3.6
            line = document.getElementById(ab + "line" + (i + 1))
            line.setAttribute("y1", line_dis)
            line.setAttribute("y2", line_dis)
            dis -= 27.8
        }


        m = max(arr_value)
        total_pixel_count = 25 * 11

        scalefactor = 10 ** (m.toString().length)

        document.getElementById(ab + "scale").innerHTML = "Scale Factor  1 X " + 10 ** (m.toString().length - 1)

        for (i = 0; i < arr_value.length; i++) {
            val=arr_value[i]
            isred=false
            if(val<0)
            {
                val=Math.abs(val)
                isred=true
            
            }

            factor_percent = (val / scalefactor) * 100

            pixel_percent = (factor_percent * (10 ** -2)) * total_pixel_count

            if (pixel_percent < 2 && pixel_percent > 0) {
                pixel_percent = 2
            }

            y = base - pixel_percent
            height = (base - y)+0.7

            bar = document.getElementById(ab + "bar" + (i + 1))


          
            
            if(isred){
            bar.setAttribute("fill","red")
            }
            else{
                bar.setAttribute("fill","rgb(0, 0, 255)")
                }

            if(y>321.4) 
            {location.reload()}
            bar.setAttribute("y", y)

           
        if(ab=="")
        document.getElementById(ab+"anmbar"+(i+1)).setAttribute("to",height)

            bar.setAttribute("height",height)

            // console.log(arr_value[i],"==",y," ",height);
       
           
           
            document.getElementById(ab + "titleb" + (i + 1)).innerHTML = "No Cases : " + arr_value[i];
          

        }


        // refreshing the element
        container=document.getElementById("holder")
        content=container.innerHTML
        container.innerHTML=content

    }







    var json;
    var states = [];
    var selected_state = undefined;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    fetch("https://disease.sh/v3/covid-19/gov/india", requestOptions)
        .then(response => response.text())
        .then(result => getJson(result))
        .catch(error =>error_alert(error));
        function error_alert(error){
            alert("Not Able To Fetch Data Check Your Internet Connection")
            console.log(error)
          
        }



    function getJson(data) {
        json = JSON.parse(data)
        for (i = 0; i < 36; i++) {
            states.push(json.states[i].state)
        }
    




        states_option = document.getElementById("select_state")
        option = document.createElement("option")
        option.value = "null"
        option.innerHTML = "--Select State--";
        option.id="option-1"
        states_option.appendChild(option)

        for (var i in states) {
            option = document.createElement("option")
            option.value = i
            option.innerHTML = states[i];
            option.id="option"+i
            states_option.appendChild(option)
        }


        i_total_arr=[json.total['active'],json.total['cases'],json.total['deaths'],json.total['recovered']]
        document.getElementById("itbase").style.display="block"
        
                
      
        i_today_arr=[json.total['todayActive'],json.total["todayCases"],json.total["todayDeaths"],json.total["todayRecovered"]]
        document.getElementById("ittbase").style.display="block"
      
     


        createGraph(i_total_arr,"it")
        createGraph(i_today_arr,"itt")
        

    }




    function show_data_state() {

        selected_state = document.getElementById("select_state")
        show_data_state_details()
      

    }



    function show_data_state_details() {

        show_data = document.getElementById("show_data")
        if (selected_state != undefined && selected_state.value != "null") {


            details = document.getElementById("select_details").value
            data = json.states[states_option.value]
            statename = data['state']

            arr_value = []

            state = ''
            if (details == "total") {
                t = 0
                state = "Total"
                for (var i in data) {
                    if (t == 0) { t++; continue }
                    arr_value.push(data[i])
                    if (t++ >= 4) break
                }

            }
            else {
                t = 0
                state = "Today"
                for (var i in data) {
                    if (t++ <= 4) continue

                    arr_value.push(data[i])

                }

            }
        
        createGraph(arr_value)

              
        element= document.getElementById("base");
        element.scrollIntoView();
        console.log("scrolling")

        }
        else {
            alert("Please Select The State First")
            show_data.innerHTML = ""
        }

    }

function darkTheme(){
    if(!darkmode){
   
        document.getElementById("marquee").style.color="white"
        document.getElementById("body").style.backgroundColor="black"
        for(var i in idd)
        {
            console.log(idd[i]);
          
            document.getElementById(idd[i]).style.backgroundColor="black"
            if(i==0){
            document.getElementById(idd[i]).style.backgroundColor="black"
            document.getElementById("it"+idd[i]).style.backgroundColor="black"
            document.getElementById("itt"+idd[i]).style.backgroundColor="black"
            }

        }
        for(var i in idw)
        {
            console.log(idw[i])
            document.getElementById(idw[i]).setAttribute("fill","white")
            document.getElementById("it"+idw[i]).setAttribute("fill","white")
            document.getElementById("itt"+idw[i]).setAttribute("fill","white")
        }
        for(i=-1;i<36;i++)
        {
            document.getElementById("option"+i).style.color="white"
        }
        document.getElementById("select_state").style.color="white"
        document.getElementById("select_details").style.color="white"
        darkmode=true;
    }
    else{
       
        console.log("white theme")
        document.getElementById("marquee").style.color="blue"
        
        document.getElementById("body").style.backgroundColor="white"

        for(var i in idd)
        {
            console.log(idd[i]);
            
            document.getElementById(idd[i]).style.backgroundColor="white"
            if(i==0){
            document.getElementById(idd[i]).style.backgroundColor="aliceblue"
            document.getElementById("it"+idd[i]).style.backgroundColor="aliceblue"
            document.getElementById("itt"+idd[i]).style.backgroundColor="aliceblue"
            }
        }
        for(var i in idw)
        {
            console.log(idw[i])
            document.getElementById(idw[i]).setAttribute("fill","black")
            document.getElementById("it"+idw[i]).setAttribute("fill","black")
            document.getElementById("itt"+idw[i]).setAttribute("fill","black")
        }
        for(i=-1;i<36;i++)
        {
            document.getElementById("option"+i).style.color="black"
        }
        document.getElementById("select_state").style.color="black"
        document.getElementById("select_details").style.color="black"
        darkmode=false
    }
}

