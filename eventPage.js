var menuItem = {
    "id": "jiraIt",
    "title" : "JiraIt",
    "contexts" : ["selection"]
}
chrome.contextMenus.create(menuItem);
console.log("Created context menu!")
function fixedEncodeURI(str){
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    console.log("RR Somthing clicked!")
    var jira_regex = /^\d+$/
    var base_url = "https://jira.xilinx.com/browse/"
    var jiraUrl = ""
    if(clickData.menuItemId == "jiraIt" && clickData.selectionText && jira_regex.test(clickData.selectionText))
    {
        console.log("RR JiraIt clicked a number!");
        jiraUrl = base_url + "CR-" + fixedEncodeURI(clickData.selectionText);
        openJiraWindow(jiraUrl);
    }
    else if(clickData.menuItemId == "jiraIt" && clickData.selectionText)
    {
        // For CR-434, SR-3476532, DRCDM-608
        var jira_regex = /^([a-zA-Z]+).?(\d+)$/;
        if(jira_regex.test(clickData.selectionText))
        {
            result = clickData.selectionText.match(jira_regex);
            jiraUrl = base_url + result[1] + "-" + result[2];
            openJiraWindow(jiraUrl);
        }
        console.log("RR JiraIt clicked text!");
    }
})

function openJiraWindow(jiraUrl)
{
    var createData = {
        "url" : jiraUrl,
        "type" : "normal",
        "top" : 5,
        "left" : 5,
        "width" : 1043,
        "height" : 911 
    };
    console.log("Creating window with url : " + jiraUrl);
    chrome.windows.create(createData, function(){});
}