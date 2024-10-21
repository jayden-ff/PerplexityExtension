// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
    // Text selection context menu items
    chrome.contextMenus.create({
      id: "summarize",
      title: "Summarize",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "explain",
      title: "Explain",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "findMore",
      title: "Find more about this Topic",
      contexts: ["selection"]
    });
  
    // Page context menu items
    chrome.contextMenus.create({
      id: "summarizePage",
      title: "Summarize this Page",
      contexts: ["page"]
    });
    chrome.contextMenus.create({
      id: "breakdownPage",
      title: "Break this Page down",
      contexts: ["page"]
    });
    chrome.contextMenus.create({
      id: "trustworthiness",
      title: "Is this Page Trustworthy?",
      contexts: ["page"]
    });
  });
  
  // Handle context menu clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    let prompt = "";
    let url = "";
  
    switch (info.menuItemId) {
      case "summarize":
        prompt = `Summarize this Text in under 3 Sentences and try to not leave out any important information, keep it very short: ${info.selectionText}`;
        break;
      case "explain":
        prompt = `Explain this Text/Term in a easy to understand choice of words and in under 3 Sentences: ${info.selectionText}`;
        break;
      case "findMore":
        prompt = `Look this Topic up and find more Information: ${info.selectionText}`;
        break;
      case "summarizePage":
        prompt = `Summarize this Article and try to only give me the most important Information. URL: ${tab.url}`;
        break;
      case "breakdownPage":
        prompt = `Look at all the Topics that are in this Article and shorten it to the extreme, give the headlines and 1/2 sentences per topic. URL: ${tab.url}`;
        break;
      case "trustworthiness":
        prompt = `Look at the Author, Publisher and Domain of this Page and list any scandals that are associated with this source, please give me alternatives and rate the trustworthiness. URL: ${tab.url}`;
        break;
    }
  
    url = `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`;
    openOrSwitchToPerplexityTab(url);
  });
  
  // Function to open or switch to Perplexity tab
  function openOrSwitchToPerplexityTab(url) {
    chrome.tabs.query({url: "https://www.perplexity.ai/*"}, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, {active: true, url: url});
        } else {
            chrome.tabs.create({url: url});
        }
    });
}