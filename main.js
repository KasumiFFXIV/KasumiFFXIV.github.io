var fightDuration = 720000
$( document ).ready(function() {
    console.log( "Document Ready" );
    console.log(buffs);
    setup();
    $( "#btnToggleSettings" ).click(function() {
        $("#settings").toggle();
        });
    $( "#btnSettingsReset" ).click(function() {
        console.log("click");
        setup();
        });
    $( "#btnGenerate").click(function(){
        buildChart();
    });
    
});

function setup(){
    $("#settingsTableElement").remove();
    $("#settings").append("<table id=\"settingsTableElement\"><thead><tr><th>JOB</th><th>BUFF</th><th>DURATION</th><th>COOLDOWN</th><th>FIRST CAST</th></tr></thead><tbody id=\"settingsTable\"></tbody></table>");
    $.each(buffs, function(index, buff){
        $("#settingsTable").append("<tr><td>"+ buff.job.shortName +"</td><td>"+ buff.name +"</td><td>"+ buff.duration +"</td><td>"+ buff.cooldown +"</td><td><input id=\""+ buff.id +"firstCast\" type=\"text\" value=\""+ buff.firstCast +"\"></td></tr>");
    });
};

function buildChart(){
    // DOM element where the Timeline will be attached
    var container = document.getElementById('timeline');

    var casts = getCasts();

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
    ]);

    var groups = [
        {
            id: 1,
            content: "Trick Attack"
        },
        {
            id: 2,
            content: "Dragon Sight"
        },
        {
            id: 3,
            content: "Battle Litany"
        },
        {
            id: 4,
            content: "Brotherhood"
        },
        {
            id: 5,
            content: "Battle Voice"
        },
        {
            id: 6,
            content: "Saber Dance"
        },
        {
            id: 7,
            content: "Technical Finish"
        },
        {
            id: 8,
            content: "Embolden"
        },
        {
            id: 9,
            content: "Devotion"
        },
        {
            id: 10,
            content: "Chain Strategem"
        }
    ]

    items.add(casts);

    // Configuration for the Timeline
    var options = {
        // General styling
            width: '100%',
			stack: true,
			showCurrentTime: false,

            // Date/time formatting
            maxMinorChars: 4,
			format: {
				minorLabels: {
					minute: 'm[m]',
				},
				majorLabels: {
					second: 'm[m]',
					minute: '',
				},
			},

			// View constraints
			min: 0,
			max: 720000,
            zoomMin: 10000,
			// View defaults
			// Show first minute by default, full fight view is a bit hard to grok.
			start: 0,
			end: 720000,

			// Zoom key handling
			zoomKey: 'altKey',
			horizontalScroll: true,
    };

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, groups, options);
    return timeline;
}

function getCasts(){
    var casts = [];
    $.each(buffs, function(index, buff){
        firstCast = $("#"+ buff.id +"firstCast").val();
        // Convert firstCast to milliseconds
        firstCast = firstCast * 1000
        // Calculate the amount of casts possible in the fight
        timeRemaining = fightDuration - firstCast;
        amountOfCasts = Math.floor(timeRemaining / (buff.cooldown*1000)) + 1;
        for (i = 0; i < amountOfCasts; i++){
            if(i === 0) {
                casts.push({content: "", start: firstCast, end: firstCast + buff.duration*1000, group: buff.id})
            } else {
                previousCast = casts[casts.length -1].start;
                casts.push({content: "", start: previousCast + buff.cooldown*1000 , end: previousCast + buff.cooldown*1000 + buff.duration*1000, group: buff.id})
            }
        } 
    });
    console.log(casts);
    return casts;
}

const buffs = [
    {
        "id": 1,
        "name": "Trick Attack",
        "jobId": 1,
        "duration": 10.0,
        "cooldown": 60.0,
        "firstCast": 10.62,
        "imgUrl": "",
        "job": {
            "name": "Ninja",
            "shortName": "NIN",
            "imgUrl": ""
        }
    },
    {
        "id": 2,
        "name": "Dragon Sight",
        "jobId": 2,
        "duration": 20.0,
        "cooldown": 120.0,
        "firstCast": 2.2,
        "imgUrl": "",
        "job": {
            "name": "Dragoon",
            "shortName": "DRG",
            "imgUrl": ""
        }
    },
    {
        "id": 3,
        "name": "Battle Litany",
        "jobId": 2,
        "duration": 20.0,
        "cooldown": 180.0,
        "firstCast": 3.8,
        "imgUrl": "",
        "job": {
            "name": "Dragoon",
            "shortName": "DRG",
            "imgUrl": ""
        }
    },
    {
        "id": 4,
        "name": "Brotherhood",
        "jobId": 3,
        "duration": 15.0,
        "cooldown": 90.0,
        "firstCast": 9.0,
        "imgUrl": "",
        "job": {
            "name": "Monk",
            "shortName": "MNK",
            "imgUrl": ""
        }
    },
    {
        "id": 5,
        "name": "Battle Voice",
        "jobId": 4,
        "duration": 20.0,
        "cooldown": 180.0,
        "firstCast": 3.0,
        "imgUrl": "",
        "job": {
            "name": "Bard",
            "shortName": "BRD",
            "imgUrl": ""
        }
    },
    {
        "id": 6,
        "name": "Saber Dance",
        "jobId": 5,
        "duration": 15.0,
        "cooldown": 120.0,
        "firstCast": 4.2,
        "imgUrl": "",
        "job": {
            "name": "Dancer",
            "shortName": "DNC",
            "imgUrl": ""
        }
    },
    {
        "id": 7,
        "name": "Technical Finish",
        "jobId": 5,
        "duration": 15.0,
        "cooldown": 120.0,
        "firstCast": 10.4,
        "imgUrl": "",
        "job": {
            "name": "Dancer",
            "shortName": "DNC",
            "imgUrl": ""
        }
    },
    {
        "id": 8,
        "name": "Embolden",
        "jobId": 6,
        "duration": 20.0,
        "cooldown": 120.0,
        "firstCast": 11.8,
        "imgUrl": "",
        "job": {
            "name": "Red Mage",
            "shortName": "RDM",
            "imgUrl": ""
        }
    },
    {
        "id": 9,
        "name": "Devotion",
        "jobId": 7,
        "duration": 15.0,
        "cooldown": 180.0,
        "firstCast": 7.0,
        "imgUrl": "",
        "job": {
            "name": "Summoner",
            "shortName": "SMN",
            "imgUrl": ""
        }
    },
    {
        "id": 10,
        "name": "Chain Strategem",
        "jobId": 8,
        "duration": 15.0,
        "cooldown": 120.0,
        "firstCast": 4.5,
        "imgUrl": "",
        "job": {
            "name": "Scholar",
            "shortName": "SCH",
            "imgUrl": ""
        }
    },
];