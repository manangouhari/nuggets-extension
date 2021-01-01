chrome.contextMenus.create({
    id: "nuggets",
    title: "Summarize using nuggets",
    contexts: ["all"],
  });
  
chrome.contextMenus.onClicked.addListener((info, tab) => {

  var data = {
    text: info.selectionText,
    page_url: tab.url,
    webpage_title: tab.title,
    website_icon_url: tab.favIconUrl
  }

  console.log(data)

  fetch("https://summarizer-text-hn.herokuapp.com/summarize/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.summary_id)
    var newURL = `http://localhost:3000/s/${data.summary_id}`
    chrome.tabs.create({ url: newURL })
  })
  .catch((error) => {
    console.error(error);
  })
})