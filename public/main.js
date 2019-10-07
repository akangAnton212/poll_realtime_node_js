const form = document.getElementById("vote-form");

form.addEventListener("submit", e => {

    const choise = document.querySelector("input[name=os]:checked").value;
    const data = {
        os:choise
    };

    fetch("http://localhost:6534/poll", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type":"application/json"
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    e.preventDefault();
});

fetch("http://localhost:6534/poll")
    .then(res => res.json())
    .then(data => {
        const votes = data.votes
        const totalVote = votes.length
        //hitung poiint vote

        const voteCount = votes.reduce((acc, vote) => 
            ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)
        ), acc),{});

        let dataPoints = [
            { label: "Windows", y: voteCount.Windows },
            { label: "Linux", y: voteCount.Linux },
            { label: "MacOS", y: voteCount.MacOS },
        ];
        
        const chartContainer = document.querySelector("#chartContainer");
        if(chartContainer){
            const chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "theme1",
                title: {
                    text: "Total Vote "+totalVote
                },
                data: [
                    {
                        type: "column",
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('8d2f69dae3beb59bcf5f', {
              cluster: 'ap1',
              forceTLS: true
            });
        
            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
                dataPoints = dataPoints.map(x => {
                    if (x.label == data.os){
                        x.y += data.points;
                        return x;
                    }else{
                        return x;
                    }
                });
                chart.render();
            });
        }
    });
