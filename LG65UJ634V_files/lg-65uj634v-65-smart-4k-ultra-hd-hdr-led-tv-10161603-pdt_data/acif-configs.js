/**
 * File generated at  2018-05-24 04:09:34 PST 
 * Client: Dixons (10004048)
 */
define("Automatons/automatons/2004", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2004,
    type: "automatons",
    attributes: {
      name: "Currys Customer Routing Guide",
      description: "ASI-125",
      initialNode: "node::2005",
      style: "style::2006"
    }
  };
});
define("Automatons/automatons/2005", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2005,
    type: "automatons",
    attributes: {
      name: "PCworld Customer Routing Guide",
      initialNode: "node::2012",
      style: "style::2005"
    }
  };
});
define("Automatons/automatons/2007", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2007,
    type: "automatons",
    attributes: {
      name: "Dixons Post Chat Survey",
      type: "satisfactionSurvey",
      description: "CMRASI-523",
      initialNode: "node::2021",
      style: "style::2010"
    }
  };
});
define("Automatons/automatons/2009", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2009,
    type: "automatons",
    attributes: {
      name: "Dixons_Currys_Service_Contact-Us",
      initialNode: "node::2025",
      style: "style::2012"
    }
  };
});
define("Automatons/automatons/2010", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2010,
    type: "automatons",
    attributes: {
      name: "Dixons_Currys_Service_Deliveries",
      description: "This automaton is just a another starting point inside the main automaton Dixons_Currys_Service_Contact-Us (2009)",
      initialNode: "node::2030",
      style: "style::2012"
    }
  };
});
define("Automatons/automatons/2011", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2011,
    type: "automatons",
    attributes: {
      name: "Dixons_Currys_Service_Returns",
      description: "This automaton is just a another starting point inside the main automaton Dixons_Currys_Service_Contact-Us (2009)",
      initialNode: "node::2034",
      style: "style::2012"
    }
  };
});
define("Automatons/automatons/2012", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2012,
    type: "automatons",
    attributes: {
      name: "Dixons_Currys_Service_Repairs",
      description: "This automaton is just a another starting point inside the main automaton Dixons_Currys_Service_Contact-Us (2009)",
      initialNode: "node::2033",
      style: "style::2012"
    }
  };
});
define("Automatons/automatons/2013", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2013,
    type: "automatons",
    attributes: {
      name: "Dixons_Currys_Service_MyAccount",
      initialNode: "node::2045",
      style: "style::2013"
    }
  };
});
define("Automatons/automatons/2014", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2014,
    type: "automatons",
    attributes: {
      name: "Dixons_PCW_Service_Contact-Us",
      initialNode: "node::2047",
      style: "style::2014"
    }
  };
});
define("Automatons/automatons/2015", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2015,
    type: "automatons",
    attributes: {
      name: "Dixons_PCW_Service_MyAccount",
      initialNode: "node::2063",
      style: "style::2015"
    }
  };
});
define("Automatons/automatons/2016", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2016,
    type: "automatons",
    attributes: {
      name: "Dixons_PCW_Service_Repairs",
      description: "This automaton is just a another starting point inside the main automaton Dixons_PCW_Service_Contact-Us (2014)",
      initialNode: "node::2061",
      style: "style::2014"
    }
  };
});
define("Automatons/automatons/2017", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2017,
    type: "automatons",
    attributes: {
      name: "Dixons_PCW_Service_Returns",
      description: "This automaton is just a another starting point inside the main automaton Dixons_PCW_Service_Contact-Us (2014)",
      initialNode: "node::2054",
      style: "style::2014"
    }
  };
});
define("Automatons/automatons/2018", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2018,
    type: "automatons",
    attributes: {
      name: "Dixons_PCW_Service_Deliveries",
      description: "This automaton is just a another starting point inside the main automaton Dixons_PCW_Service_Contact-Us (2014)",
      initialNode: "node::2049",
      style: "style::2014"
    }
  };
});
define("Automatons/automatons/2020", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2020,
    type: "automatons",
    attributes: {
      name: "Dixons PCW Post Chat Survey",
      type: "satisfactionSurvey",
      description: "CMRASI-1209",
      initialNode: "node::2075",
      style: "style::2010"
    }
  };
});
define("Automatons/nodes/1392", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 1392,
    type: "nodes",
    attributes: {
      name: "Currys Promotion - Initial Node",
      type: "Promotion",
      onEntry: function onEntry() {
        setTimeout(function () {
          var topWindow = window.parent.parent;
          topWindow.inqFrame.document.getElementById('timeOutNode').click();
        }, 15000);
      },
      template: "template::2027"
    }
  };
});
define("Automatons/nodes/1393", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 1393,
    type: "nodes",
    attributes: {
      name: "Currys Promotion - Exit on close click",
      type: "Exit",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "Exit on close click"
    }
  };
});
define("Automatons/nodes/1394", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 1394,
    type: "nodes",
    attributes: {
      name: "Currys Promotion - Exit on promo image click",
      type: "Exit",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "Exit on promo image click"
    }
  };
});
define("Automatons/nodes/1395", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 1395,
    type: "nodes",
    attributes: {
      name: "Currys Promotion - Exit time passed",
      type: "Exit",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "Exit time passed"
    }
  };
});
define("Automatons/nodes/1396", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 1396,
    type: "nodes",
    attributes: {
      name: "Currys Promotion - Exit added to basket",
      type: "Exit",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "Added to basket"
    }
  };
});
define("Automatons/nodes/1397", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 1397,
    type: "nodes",
    attributes: {
      name: "Currys Promotion - Click Add To Basket",
      type: "Click",
      onEntry: function onEntry() {
        api.fireCustomEvent('AddItemToBasket');
        return 'node::1396';
      }
    }
  };
});
define("Automatons/nodes/2001", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2001,
    type: "nodes",
    attributes: {
      name: "pcworld",
      type: "list",
      image_close: "close-purple.png",
      image_title: "pcworld-header.png",
      node_id: "node::2002",
      onExit: function onExit() {
        api.resize(400, 500);
      },
      template: "template::2002"
    }
  };
});
define("Automatons/nodes/2002", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2002,
    type: "nodes",
    attributes: {
      name: "PCworld Chat Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10004984,
        businessUnit: 19000633,
        checkAgentAvailability: false
      },
      isOutcomeNode: 1,
      outcomeMessage: "PCworld Chat Node",
      viewport: {
        height: 460,
        position: "bottom right",
        width: 390
      }
    }
  };
});
define("Automatons/nodes/2003", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2003,
    type: "nodes",
    attributes: {
      name: "currys",
      type: "guide",
      image_close: "close-blue.png",
      image_title: "currys-header.png",
      node_id: "node::2004",
      onExit: function onExit() {
        api.resize(400, 500);
      },
      template: "template::2002"
    }
  };
});
define("Automatons/nodes/2004", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2004,
    type: "nodes",
    attributes: {
      name: "Currys Chat Node",
      type: "Chat",
      chatRouter: {
        agentGroup: 10004985,
        businessUnit: 19000633,
        checkAgentAvailability: false
      },
      isOutcomeNode: 1,
      outcomeMessage: "Currys Chat Node",
      viewport: {
        height: 460,
        position: "bottom right",
        width: 390
      }
    }
  };
});
define("Automatons/nodes/2005", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2005,
    type: "nodes",
    attributes: {
      name: "Currys Customer Routing Guide - Intiial",
      type: "routing",
      template: "template::2003",
      transitions: {
        route: [{
          condition: "_.reason_for_assist === 'making_a_purchase'",
          target: "node::2004"
        }, {
          condition: "['return_or_exchange_a_purchased_item', 'track_your_delivery'].indexOf(_.reason_for_assist) > -1",
          target: "node::2006"
        }, {
          target: "node::2009"
        }]
      }
    }
  };
});
define("Automatons/nodes/2006", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2006,
    type: "nodes",
    attributes: {
      name: "Loading Redirect - Currys",
      type: "loading",
      loading_gif_url: "https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/currys-loading-360-gray.gif",
      onEntry: function onEntry() {
        api.setTimeout(function () {
          api.triggerTransition('redirect_to');
        }, 4000);
      },
      template: "template::2005",
      transitions: {
        redirect_to: [{
          condition: "_.reason_for_assist === 'return_or_exchange_a_purchased_item'",
          target: "node::2008"
        }, {
          condition: "_.reason_for_assist === 'track_your_delivery'",
          target: "node::2010"
        }, {
          condiiton: "api.getPreviousNode().id === 2009",
          target: "node::2011"
        }]
      }
    }
  };
});
define("Automatons/nodes/2008", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2008,
    type: "nodes",
    attributes: {
      name: "Redirect - Currys Returns Cancellations",
      type: "redirect",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "redirected to: http://www.currys.co.uk/gbuk/returns-cancellations-1043-theme.html",
      redirectTarget: "current",
      redirectUrl: "http://www.currys.co.uk/gbuk/returns-cancellations-1043-theme.html"
    }
  };
});
define("Automatons/nodes/2009", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2009,
    type: "nodes",
    attributes: {
      name: "Currys Generic Self Help",
      type: "self-help",
      isOutcomeNode: 1,
      loading_redirect_node_id: 2006,
      outcomeMessage: "Currys Generic Self-Help",
      template: "template::2004"
    }
  };
});
define("Automatons/nodes/2010", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2010,
    type: "nodes",
    attributes: {
      name: "Redirect - Currys Track Your Order",
      type: "redirect",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "redirected to: http://www.currys.co.uk/gbuk/track-your-order-1028-theme.html",
      redirectTarget: "current",
      redirectUrl: "http://www.currys.co.uk/gbuk/track-your-order-1028-theme.html"
    }
  };
});
define("Automatons/nodes/2011", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2011,
    type: "nodes",
    attributes: {
      name: "Redirect - Currys Generic FAQ",
      type: "redirect",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "Redirected to http://www.currys.co.uk/gbuk/customer-services-1143-theme.html",
      redirectTarget: "current",
      redirectUrl: "http://www.currys.co.uk/gbuk/customer-services-1143-theme.html"
    }
  };
});
define("Automatons/nodes/2012", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2012,
    type: "nodes",
    attributes: {
      name: "PCworld Customer Routing Guide - Initial",
      type: "routing",
      template: "template::2003",
      transitions: {
        route: [{
          condition: "_.reason_for_assist === 'making_a_purchase'",
          target: "node::2002"
        }, {
          condition: "['return_or_exchange_a_purchased_item', 'track_your_delivery'].indexOf(_.reason_for_assist) > -1",
          target: "node::2017"
        }, {
          target: "node::2013"
        }]
      }
    }
  };
});
define("Automatons/nodes/2013", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2013,
    type: "nodes",
    attributes: {
      name: "PCworld Generic Self Help",
      type: "self-help",
      isOutcomeNode: 1,
      loading_redirect_node_id: 2017,
      outcomeMessage: "PCworld Generic Self Help",
      template: "template::2004"
    }
  };
});
define("Automatons/nodes/2014", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2014,
    type: "nodes",
    attributes: {
      name: "Redirect - PCworld Returns Cancellations",
      type: "redirect",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "redirected to: http://www.pcworld.co.uk/gbuk/returns-cancellations-878-theme.html",
      redirectTarget: "current",
      redirectUrl: "http://www.pcworld.co.uk/gbuk/returns-cancellations-878-theme.html"
    }
  };
});
define("Automatons/nodes/2015", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2015,
    type: "nodes",
    attributes: {
      name: "Redirect - PCworld Generic FAQ",
      type: "redirect",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "redirected to: http://www.pcworld.co.uk/gbuk/faqs-958-theme.html",
      redirectTarget: "current",
      redirectUrl: "http://www.pcworld.co.uk/gbuk/faqs-958-theme.html"
    }
  };
});
define("Automatons/nodes/2016", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2016,
    type: "nodes",
    attributes: {
      name: "Redirect - PCworld Track Your Order",
      type: "redirect",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "redirected to: http://www.pcworld.co.uk/gbuk/track-your-order-877-theme.html",
      redirectTarget: "current",
      redirectUrl: "http://www.pcworld.co.uk/gbuk/track-your-order-877-theme.html"
    }
  };
});
define("Automatons/nodes/2017", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2017,
    type: "nodes",
    attributes: {
      name: "Loading Redirect - PCworld",
      type: "redirect",
      loading_gif_url: "https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/pcworld-loading-360-gray.gif",
      onEntry: function onEntry() {
        api.setTimeout(function () {
          api.triggerTransition('redirect_to');
        }, 4000);
      },
      template: "template::2005",
      transitions: {
        redirect_to: [{
          condition: "_.reason_for_assist === 'return_or_exchange_a_purchased_item'",
          target: "node::2014"
        }, {
          condition: "_.reason_for_assist === 'track_your_delivery'",
          target: "node::2016"
        }, {
          condiiton: "api.getPreviousNode().id === 2013",
          target: "node::2015"
        }]
      }
    }
  };
});
define("Automatons/nodes/2021", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2021,
    type: "nodes",
    attributes: {
      name: "Dixons Post Chat Survey - Initial",
      type: "survey",
      formify: {
        fields: [{
          id: "recommend-scale",
          type: "select",
          label: "1. On a scale of 0 to 10, how likely are you to recommend Currys to friends or family?",
          options: ["0 - not at all likely", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - extremely likely"],
          placeholder: "Please select one..."
        }, {
          fields: [{
            id: "colleague-knowledgeable",
            type: "select",
            label: "Our colleague was knowledgeable",
            options: ["0 - strongly disagree", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - strongly agree"],
            placeholder: "Please select one..."
          }, {
            id: "colleague-cared",
            type: "select",
            label: "Our colleague cared about answering your query",
            options: ["0 - strongly disagree", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - strongly agree"],
            placeholder: "Please select one..."
          }],
          group: "2. Thinking about your chat with our colleague, on a scale of 0 to 10 please rate the following:"
        }, {
          fields: [{
            id: "method-get-answers",
            type: "select",
            label: "3. If you hadn't been able to chat with us, what method would you have used to get the answers to your questions?",
            options: ["Telephone", "Email", "Social media", "Curry website", "Other websites", "Currys stores", "Other"],
            placeholder: "Please select one..."
          }, {
            id: "method-get-answers-other",
            type: "text",
            dynamic: {
              check: "method-get-answers",
              logic: "equals",
              value: "Other"
            },
            label: "Please specify:"
          }],
          group: ""
        }, {
          id: "chat-rep-satisfaction",
          type: "select",
          label: "4. How satisfied are you with your overall experience with Currys today?",
          options: ["0 - not satisfied", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - extremely satisfied"],
          placeholder: "Please select one..."
        }, {
          id: "feedback-experience",
          type: "textarea",
          label: "5. If there was one thing we could do to improve your experience of live chat today, what would it be?"
        }],
        heading: "Thank you for using our live chat service today. So that we can improve our service, please would you help us by answering the following questions:",
        next: "submit"
      },
      surveyAlerts: [{
        name: "Email-Alert-Perfect-Dixons",
        conditions: {
          or: ["colleague-knowledgeable equals 10 - strongly agree", "colleague-cared equals 10 - strongly agree"]
        },
        emailSpecName: "Email-Alert-Perfect-Dixons",
        emailSubject: "Currys Sales Survey Alert : Perfect",
        emailTemplate: "template::2012"
      }, {
        name: "Email-Alert-Development-Dixons",
        conditions: {
          or: ["colleague-cared equals 0 - strongly disagree", "colleague-cared equals 1", "colleague-cared equals 2"]
        },
        emailSpecName: "Email-Alert-Development-Dixons",
        emailSubject: "Currys Sales Survey Alert : Development",
        emailTemplate: "template::2016"
      }],
      template: "template::2046",
      transitions: {
        submit: {
          target: "node::2022"
        }
      }
    }
  };
});
define("Automatons/nodes/2022", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2022,
    type: "nodes",
    attributes: {
      name: "Dixons Post Chat Survey Thank You",
      type: "thankyou",
      isOutcomeNode: 1,
      template: "template::2035"
    }
  };
});
define("Automatons/nodes/2023", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2023,
    type: "nodes",
    attributes: {
      name: "Currys_IDV_Form_Node",
      type: "pushform",
      formify: {
        fields: [{
          id: "name",
          label: "Name",
          placeholder: "Name:"
        }, {
          id: "email",
          label: "Email",
          placeholder: "Email:",
          validate: {
            pattern: ".*@.*",
            patternError: "This is not a valid email address."
          }
        }, {
          id: "purchased",
          type: "select",
          label: "Purchased",
          options: ["Online", "In Store"],
          placeholder: "Select"
        }, {
          id: "order-number",
          dynamic: {
            check: "purchased",
            value: "Online"
          },
          label: "Order Number",
          placeholder: "Order Number: CUR/PCWxxxxxxxxxx",
          validate: {
            pattern: "^([cC][uU][rR]|[pP][cC][wW])[0-9]{10}$",
            patternError: "This should starts with CUR or PCW followed by 10 digits."
          }
        }, {
          id: "delivery-reference",
          dynamic: {
            check: "purchased",
            value: "In Store"
          },
          label: "Delivery Reference",
          placeholder: "Delivery Reference: 74xxxxxxxx",
          validate: {
            pattern: "^74[0-9]{8}$",
            patternError: "This should be 10 digits starting with 74."
          }
        }, {
          id: "postal-address",
          label: "Postal Address",
          placeholder: "Postal Address:"
        }],
        heading: "",
        next: "datapass"
      },
      template: "template::2023",
      transitions: {
        datapass: [{
          target: "node::2024"
        }]
      }
    }
  };
});
define("Automatons/nodes/2024", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2024,
    type: "nodes",
    attributes: {
      name: "Purchased Agent Push Form - datapass",
      type: "datapass",
      onEntry: function onEntry() {
        var formData = api.getAllFormData();
        api.IJSF.sendDatapassMessage(formData);
        api.triggerTransition("close");
      },
      transitions: {
        close: [{
          target: "node::2046"
        }]
      }
    }
  };
});
define("Automatons/nodes/2025", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2025,
    type: "nodes",
    attributes: {
      name: "Dixons_service_Contact-Us_Node",
      type: "Guide",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2033",
      transitions: {
        purchase: [{
          target: "node::2029"
        }],
        repair: [{
          target: "node::2033"
        }],
        "return": [{
          target: "node::2034"
        }],
        support: [{
          target: "node::2039"
        }],
        track: [{
          target: "node::2030"
        }]
      }
    }
  };
});
define("Automatons/nodes/2026", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2026,
    type: "nodes",
    attributes: {
      name: "Currys_Returns_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10005951,
        agentsBusyNode: "node::2037",
        businessUnit: 19001101,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2037",
        scriptTree: 12201172
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2027", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2027,
    type: "nodes",
    attributes: {
      name: "Currys_Deliveries_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10005952,
        agentsBusyNode: "node::2037",
        businessUnit: 19001101,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2037",
        scriptTree: 12201173
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2028", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2028,
    type: "nodes",
    attributes: {
      name: "Currys_Repairs_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10005953,
        agentsBusyNode: "node::2037",
        businessUnit: 19001101,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2037",
        scriptTree: 12201174
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2029", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2029,
    type: "nodes",
    attributes: {
      name: "Currys_Sales_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10004985,
        agentsBusyNode: "node::2036",
        businessUnit: 19000633,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2036",
        scriptTree: 12200448
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2030", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2030,
    type: "nodes",
    attributes: {
      name: "Currys_Deliveries_Due_Today_Node",
      type: "dialog",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2024",
      transitions: {
        no: [{
          target: "node::2035"
        }],
        yes: [{
          target: "node::2031"
        }]
      }
    }
  };
});
define("Automatons/nodes/2031", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2031,
    type: "nodes",
    attributes: {
      name: "Currys_Deliveries_Timeslot_Node",
      type: "dialog",
      template: "template::2026",
      transitions: {
        no: [{
          target: "node::2039"
        }],
        yes: [{
          target: "node::2027"
        }]
      }
    }
  };
});
define("Automatons/nodes/2032", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2032,
    type: "nodes",
    attributes: {
      name: "Currys_Purchase_Source_Damaged_Node",
      type: "dialog",
      template: "template::2025",
      transitions: {
        instore: [{
          target: "node::2040"
        }],
        online: [{
          target: "node::2038"
        }]
      }
    }
  };
});
define("Automatons/nodes/2033", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2033,
    type: "nodes",
    attributes: {
      name: "Currys_Repairs_New_Booking_Node",
      type: "dialog",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2037",
      transitions: {
        no: [{
          target: "node::2039"
        }],
        yes: [{
          target: "node::2028"
        }]
      }
    }
  };
});
define("Automatons/nodes/2034", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2034,
    type: "nodes",
    attributes: {
      name: "Currys_Returns_Topics_Node",
      type: "guide",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2059",
      transitions: {
        anything_else: [{
          target: "node::2025"
        }],
        change_of_mind: [{
          target: "node::2026"
        }],
        damaged: [{
          target: "node::2032"
        }],
        faulty: [{
          target: "node::2026"
        }],
        order_cancellation: [{
          target: "node::2026"
        }],
        wrong_item: [{
          target: "node::2044"
        }]
      }
    }
  };
});
define("Automatons/nodes/2035", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2035,
    type: "nodes",
    attributes: {
      name: "Currys_Deliveries_Topics_Node",
      type: "guide",
      template: "template::2032",
      transitions: {
        addremove: [{
          target: "node::2041"
        }],
        address: [{
          target: "node::2027"
        }],
        cancel: [{
          target: "node::2027"
        }],
        date: [{
          target: "node::2027"
        }],
        "else": [{
          target: "node::2025"
        }],
        instructions: [{
          target: "node::2027"
        }],
        phone: [{
          target: "node::2027"
        }],
        timeslot: [{
          target: "node::2027"
        }],
        track: [{
          target: "node::2027"
        }]
      }
    }
  };
});
define("Automatons/nodes/2036", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2036,
    type: "nodes",
    attributes: {
      name: "Currys_Sales_Telephony_Referral_Node",
      type: "self-help",
      template: "template::2030",
      transitions: {
        redirect: [{
          target: "node::2070"
        }]
      }
    }
  };
});
define("Automatons/nodes/2037", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2037,
    type: "nodes",
    attributes: {
      name: "Currys_Service_Telephony_Referral_Node",
      type: "self-help",
      template: "template::2038",
      transitions: {
        redirect: [{
          target: "node::2070"
        }]
      }
    }
  };
});
define("Automatons/nodes/2038", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2038,
    type: "nodes",
    attributes: {
      name: "Currys_Returns_Damaged_Online_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2061"
    }
  };
});
define("Automatons/nodes/2039", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2039,
    type: "nodes",
    attributes: {
      name: "Currys_Telephony_Referral_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2034",
      transitions: {
        redirect: [{
          target: "node::2070"
        }]
      }
    }
  };
});
define("Automatons/nodes/2040", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2040,
    type: "nodes",
    attributes: {
      name: "Currys_Returns_Damaged_In-Store_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2048"
    }
  };
});
define("Automatons/nodes/2041", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2041,
    type: "nodes",
    attributes: {
      name: "Currys_TKH_Referral_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2056",
      transitions: {
        redirect: [{
          target: "node::2071"
        }]
      }
    }
  };
});
define("Automatons/nodes/2042", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2042,
    type: "nodes",
    attributes: {
      name: "Currys_Returns_Wrong_Item_Online_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2028"
    }
  };
});
define("Automatons/nodes/2043", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2043,
    type: "nodes",
    attributes: {
      name: "Currys_Returns_Wrong_Item_In-Store_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2044"
    }
  };
});
define("Automatons/nodes/2044", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2044,
    type: "nodes",
    attributes: {
      name: "Currys_Purchase_Source_Wrong_Item_Node",
      type: "dialog",
      template: "template::2039",
      transitions: {
        instore: [{
          target: "node::2043"
        }],
        online: [{
          target: "node::2042"
        }]
      }
    }
  };
});
define("Automatons/nodes/2045", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2045,
    type: "nodes",
    attributes: {
      name: "Currys_MyAccount_PasswordErr_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2029"
    }
  };
});
define("Automatons/nodes/2046", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2046,
    type: "nodes",
    attributes: {
      name: "Purchased Agent Push Form - close",
      type: "close",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "User has submitted the form"
    }
  };
});
define("Automatons/nodes/2047", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2047,
    type: "nodes",
    attributes: {
      name: "PCW_service_Contact-Us_Node",
      type: "Guide",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2053",
      transitions: {
        purchase: [{
          target: "node::2067"
        }],
        repair: [{
          target: "node::2061"
        }],
        "return": [{
          target: "node::2054"
        }],
        support: [{
          target: "node::2052"
        }],
        track: [{
          target: "node::2049"
        }]
      }
    }
  };
});
define("Automatons/nodes/2048", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2048,
    type: "nodes",
    attributes: {
      name: "PCW_Sales_Telephony_Referral_Node",
      type: "self-help",
      template: "template::2055",
      transitions: {
        redirect: [{
          target: "node::2068"
        }]
      }
    }
  };
});
define("Automatons/nodes/2049", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2049,
    type: "nodes",
    attributes: {
      name: "PCW_Deliveries_Due_Today_Node",
      type: "dialog",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2049",
      transitions: {
        no: [{
          target: "node::2051"
        }],
        yes: [{
          target: "node::2050"
        }]
      }
    }
  };
});
define("Automatons/nodes/2050", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2050,
    type: "nodes",
    attributes: {
      name: "PCW_Deliveries_Timeslot_Node",
      type: "dialog",
      template: "template::2052",
      transitions: {
        no: [{
          target: "node::2052"
        }],
        yes: [{
          target: "node::2065"
        }]
      }
    }
  };
});
define("Automatons/nodes/2051", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2051,
    type: "nodes",
    attributes: {
      name: "PCW_Deliveries_Topics_Node",
      type: "guide",
      template: "template::2040",
      transitions: {
        addremove: [{
          target: "node::2053"
        }],
        address: [{
          target: "node::2065"
        }],
        cancel: [{
          target: "node::2065"
        }],
        date: [{
          target: "node::2065"
        }],
        "else": [{
          target: "node::2047"
        }],
        instructions: [{
          target: "node::2065"
        }],
        phone: [{
          target: "node::2065"
        }],
        timeslot: [{
          target: "node::2065"
        }],
        track: [{
          target: "node::2065"
        }]
      }
    }
  };
});
define("Automatons/nodes/2052", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2052,
    type: "nodes",
    attributes: {
      name: "PCW_Telephony_Referral_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2031",
      transitions: {
        redirect: [{
          target: "node::2068"
        }]
      }
    }
  };
});
define("Automatons/nodes/2053", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2053,
    type: "nodes",
    attributes: {
      name: "PCW_TKH_Referral_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2042",
      transitions: {
        redirect: [{
          target: "node::2069"
        }]
      }
    }
  };
});
define("Automatons/nodes/2054", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2054,
    type: "nodes",
    attributes: {
      name: "PCW_Returns_Topics_Node",
      type: "guide",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2043",
      transitions: {
        anything_else: [{
          target: "node::2047"
        }],
        change_of_mind: [{
          target: "node::2064"
        }],
        damaged: [{
          target: "node::2055"
        }],
        faulty: [{
          target: "node::2064"
        }],
        order_cancellation: [{
          target: "node::2064"
        }],
        wrong_item: [{
          target: "node::2060"
        }]
      }
    }
  };
});
define("Automatons/nodes/2055", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2055,
    type: "nodes",
    attributes: {
      name: "PCW_Purchase_Source_Damaged_Node",
      type: "dialog",
      template: "template::2058",
      transitions: {
        instore: [{
          target: "node::2057"
        }],
        online: [{
          target: "node::2056"
        }]
      }
    }
  };
});
define("Automatons/nodes/2056", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2056,
    type: "nodes",
    attributes: {
      name: "PCW_Returns_Damaged_Online_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2047"
    }
  };
});
define("Automatons/nodes/2057", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2057,
    type: "nodes",
    attributes: {
      name: "PCW_Returns_Damaged_In-Store_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2050"
    }
  };
});
define("Automatons/nodes/2058", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2058,
    type: "nodes",
    attributes: {
      name: "PCW_Returns_Wrong_Item_Online_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2057"
    }
  };
});
define("Automatons/nodes/2059", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2059,
    type: "nodes",
    attributes: {
      name: "PCW_Returns_Wrong_Item_In-Store_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2045"
    }
  };
});
define("Automatons/nodes/2060", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2060,
    type: "nodes",
    attributes: {
      name: "PCW_Purchase_Source_Wrong_Item_Node",
      type: "dialog",
      template: "template::2060",
      transitions: {
        instore: [{
          target: "node::2059"
        }],
        online: [{
          target: "node::2058"
        }]
      }
    }
  };
});
define("Automatons/nodes/2061", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2061,
    type: "nodes",
    attributes: {
      name: "PCW_Repairs_New_Booking_Node",
      type: "dialog",
      onEntry: function onEntry() {
        api.fireCustomEvent('DixonsCareHasSeenGuide');
      },
      template: "template::2054",
      transitions: {
        no: [{
          target: "node::2052"
        }],
        yes: [{
          target: "node::2066"
        }]
      }
    }
  };
});
define("Automatons/nodes/2062", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2062,
    type: "nodes",
    attributes: {
      name: "PCW_Service_Telephony_Referral_Node",
      type: "self-help",
      template: "template::2041",
      transitions: {
        redirect: [{
          target: "node::2068"
        }]
      }
    }
  };
});
define("Automatons/nodes/2063", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2063,
    type: "nodes",
    attributes: {
      name: "PCW_MyAccount_PasswordErr_Node",
      type: "self-help",
      isOutcomeNode: 1,
      template: "template::2036"
    }
  };
});
define("Automatons/nodes/2064", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2064,
    type: "nodes",
    attributes: {
      name: "PCW_Returns_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10006019,
        agentsBusyNode: "node::2062",
        businessUnit: 19001101,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2062",
        scriptTree: 12201181
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2065", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2065,
    type: "nodes",
    attributes: {
      name: "PCW_Deliveries_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10006015,
        agentsBusyNode: "node::2062",
        businessUnit: 19001101,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2062",
        scriptTree: 12201179
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2066", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2066,
    type: "nodes",
    attributes: {
      name: "PCW_Repairs_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10006018,
        agentsBusyNode: "node::2062",
        businessUnit: 19001101,
        checkAgentAvailability: true,
        outsideHopNode: "node::2062",
        scriptTree: 12201180
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2067", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2067,
    type: "nodes",
    attributes: {
      name: "PCW_Sales_Chat_Node",
      type: "chat",
      chatRouter: {
        agentGroup: 10004984,
        agentsBusyNode: "node::2048",
        businessUnit: 19000633,
        checkAgentAvailability: true,
        clientOutcome: "We are happy to assist. How can we help with your query?",
        outsideHopNode: "node::2048",
        scriptTree: 12200416
      },
      isOutcomeNode: 1
    }
  };
});
define("Automatons/nodes/2068", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2068,
    type: "nodes",
    attributes: {
      name: "PCW_Redirect_to_Customer_Services",
      type: "redirect",
      isExitNode: 1,
      redirectTarget: "current",
      redirectUrl: "https://www.pcworld.co.uk/gbuk/customer-services-894-theme.html"
    }
  };
});
define("Automatons/nodes/2069", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2069,
    type: "nodes",
    attributes: {
      name: "PCW_Redirect_to_TeamKnowHow",
      type: "redirect",
      isExitNode: 1,
      redirectTarget: "current",
      redirectUrl: "https://www.teamknowhow.com"
    }
  };
});
define("Automatons/nodes/2070", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2070,
    type: "nodes",
    attributes: {
      name: "Currys_Redirect_to_Customer_Services",
      type: "redirect",
      isExitNode: 1,
      redirectTarget: "current",
      redirectUrl: "http://www.currys.co.uk/gbuk/customer-services-1143-theme.html"
    }
  };
});
define("Automatons/nodes/2071", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2071,
    type: "nodes",
    attributes: {
      name: "Currys_Redirect_to_TeamKnowHow",
      type: "redirect",
      isExitNode: 1,
      redirectTarget: "current",
      redirectUrl: "https://www.teamknowhow.com"
    }
  };
});
define("Automatons/nodes/2072", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2072,
    type: "nodes",
    attributes: {
      name: "PCW_IDV_Form_Node 2019",
      type: "pushform",
      formify: {
        fields: [{
          id: "name",
          label: "Name",
          placeholder: "Name:"
        }, {
          id: "email",
          label: "Email",
          placeholder: "Email:",
          validate: {
            pattern: ".*@.*",
            patternError: "This is not a valid email address."
          }
        }, {
          id: "purchased",
          type: "select",
          label: "Purchased",
          options: ["Online", "In Store"],
          placeholder: "Select"
        }, {
          id: "order-number",
          dynamic: {
            check: "purchased",
            value: "Online"
          },
          label: "Order Number",
          placeholder: "Order Number: CUR/PCWxxxxxxxxxx",
          validate: {
            pattern: "^([cC][uU][rR]|[pP][cC][wW])[0-9]{10}$",
            patternError: "This should starts with CUR or PCW followed by 10 digits."
          }
        }, {
          id: "delivery-reference",
          dynamic: {
            check: "purchased",
            value: "In Store"
          },
          label: "Delivery Reference",
          placeholder: "Delivery Reference: 74xxxxxxxx",
          validate: {
            pattern: "^74[0-9]{8}$",
            patternError: "This should be 10 digits starting with 74."
          }
        }, {
          id: "postal-address",
          label: "Postal Address",
          placeholder: "Postal Address:"
        }],
        heading: "",
        next: "datapass"
      },
      template: "template::2023",
      transitions: {
        datapass: [{
          target: "node::2073"
        }]
      }
    }
  };
});
define("Automatons/nodes/2073", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2073,
    type: "nodes",
    attributes: {
      name: "PCW_Purchased Agent Push Form - datapass 2019",
      type: "datapass",
      onEntry: function onEntry() {
        var formData = api.getAllFormData();
        api.IJSF.sendDatapassMessage(formData);
        api.triggerTransition("close");
      },
      transitions: {
        close: [{
          target: "node::2074"
        }]
      }
    }
  };
});
define("Automatons/nodes/2074", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2074,
    type: "nodes",
    attributes: {
      name: "PCW_Purchased Agent Push Form - close 2019",
      type: "close",
      isExitNode: 1,
      isOutcomeNode: 1,
      outcomeMessage: "User has submitted the form"
    }
  };
});
define("Automatons/nodes/2075", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    id: 2075,
    type: "nodes",
    attributes: {
      name: "Dixons PCW Post Chat Survey - Initial",
      type: "survey",
      formify: {
        fields: [{
          id: "recommend-scale",
          type: "select",
          label: "1. On a scale of 0 to 10, how likely are you to recommend PCWorld to friends or family?",
          options: ["0 - not at all likely", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - extremely likely"],
          placeholder: "Please select one..."
        }, {
          fields: [{
            id: "colleague-knowledgeable",
            type: "select",
            label: "Our colleague was knowledgeable",
            options: ["0 - strongly disagree", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - strongly agree"],
            placeholder: "Please select one..."
          }, {
            id: "colleague-cared",
            type: "select",
            label: "Our colleague cared about answering your query",
            options: ["0 - strongly disagree", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - strongly agree"],
            placeholder: "Please select one..."
          }],
          group: "2. Thinking about your chat with our colleague, on a scale of 0 to 10 please rate the following:"
        }, {
          fields: [{
            id: "method-get-answers",
            type: "select",
            label: "3. If you hadn't been able to chat with us, what method would you have used to get the answers to your questions?",
            options: ["Telephone", "Email", "Social media", "PCWorld website", "Other websites", "PCWorld stores", "Other"],
            placeholder: "Please select one..."
          }, {
            id: "method-get-answers-other",
            type: "text",
            dynamic: {
              check: "method-get-answers",
              logic: "equals",
              value: "Other"
            },
            label: "Please specify:"
          }],
          group: ""
        }, {
          id: "chat-rep-satisfaction",
          type: "select",
          label: "4. How satisfied are you with your overall experience with PCWorld today?",
          options: ["0 - not satisfied", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 - extremely satisfied"],
          placeholder: "Please select one..."
        }, {
          id: "feedback-experience",
          type: "textarea",
          label: "5. If there was one thing we could do to improve your experience of live chat today, what would it be?"
        }],
        heading: "Thank you for using our live chat service today. So that we can improve our service, please would you help us by answering the following questions:",
        next: "submit"
      },
      surveyAlerts: [{
        name: "Email-Alert-Perfect-PCWorld",
        conditions: {
          or: ["colleague-knowledgeable equals 10 - strongly agree", "colleague-cared equals 10 - strongly agree"]
        },
        emailSpecName: "Email-Alert-Perfect-PCWorld",
        emailSubject: "PCWorld Sales Survey Alert : Perfect",
        emailTemplate: "template::2012"
      }, {
        name: "Email-Alert-Development-PCWorld",
        conditions: {
          or: ["colleague-cared equals 0 - strongly disagree", "colleague-cared equals 1", "colleague-cared equals 2"]
        },
        emailSpecName: "Email-Alert-Development-PCWorld",
        emailSubject: "PCWorld Sales Survey Alert : Development",
        emailTemplate: "template::2016"
      }],
      template: "template::2051",
      transitions: {
        submit: {
          target: "node::2022"
        }
      }
    }
  };
});
define('Automatons/styles/2005', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {    /* Request to Chat */  /* Dixons Global */}#viewport html,#viewport body,#viewport div,#viewport span,#viewport applet,#viewport object,#viewport iframe,#viewport h1,#viewport h2,#viewport h3,#viewport h4,#viewport h5,#viewport h6,#viewport p,#viewport blockquote,#viewport pre,#viewport a,#viewport abbr,#viewport acronym,#viewport address,#viewport big,#viewport cite,#viewport code,#viewport del,#viewport dfn,#viewport em,#viewport img,#viewport ins,#viewport kbd,#viewport q,#viewport s,#viewport samp,#viewport small,#viewport strike,#viewport strong,#viewport sub,#viewport sup,#viewport tt,#viewport var,#viewport b,#viewport u,#viewport i,#viewport center,#viewport dl,#viewport dt,#viewport dd,#viewport ol,#viewport ul,#viewport li,#viewport fieldset,#viewport form,#viewport label,#viewport legend,#viewport table,#viewport caption,#viewport tbody,#viewport tfoot,#viewport thead,#viewport tr,#viewport th,#viewport td,#viewport article,#viewport aside,#viewport canvas,#viewport details,#viewport embed,#viewport figure,#viewport figcaption,#viewport footer,#viewport header,#viewport hgroup,#viewport menu,#viewport nav,#viewport output,#viewport ruby,#viewport section,#viewport summary,#viewport time,#viewport mark,#viewport audio,#viewport video {  margin: 0;  padding: 0;  border: 0;  font-size: 100%;  font: inherit;  vertical-align: baseline;}#viewport article,#viewport aside,#viewport details,#viewport figcaption,#viewport figure,#viewport footer,#viewport header,#viewport hgroup,#viewport menu,#viewport nav,#viewport section {  display: block;}#viewport body {  line-height: 1;}#viewport ol,#viewport ul {  list-style: none;}#viewport blockquote,#viewport q {  quotes: none;}#viewport blockquote:before,#viewport blockquote:after,#viewport q:before,#viewport q:after {  content: "";  content: none;}#viewport table {  border-collapse: collapse;  border-spacing: 0;}#viewport form legend {  margin-bottom: 15px;}#viewport form fieldset.list button,#viewport form fieldset.list label.button {  margin-top: 10px;  color: #551A8B;  text-decoration: underline;  cursor: pointer;  margin: 2px 0px;  padding: 10px 0px 10px 15px;  display: block;  width: 100%;  text-align: left;  border: 0px;  border-left: 5px solid transparent;  background-color: transparent;  transition: border-color 0.4s ease, background-color 0.4s ease;}#viewport form fieldset.list button input,#viewport form fieldset.list label.button input {  display: none;}#viewport #loading-image {  display: block;  margin: 20px auto;  height: 200px;}#viewport .waiting-to-help {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  color: #FFF;  text-align: center;  background-repeat: no-repeat;  background-size: cover;}#viewport .waiting-to-help header,#viewport .waiting-to-help footer {  z-index: 2;}#viewport .waiting-to-help header .inner,#viewport .waiting-to-help footer .inner {  position: absolute;  top: 50%;  width: 100%;}#viewport .waiting-to-help header {  position: relative;  font-size: 18px;  text-align: left;  background-color: #FFF;  height: 52px;}#viewport .waiting-to-help header #header-image {  padding-left: 2%;  width: 85%;}#viewport .waiting-to-help header #close-button {  position: absolute;  top: 0;  right: 0;  height: 20px;  padding: 15px;}#viewport .waiting-to-help header #message {  position: relative;  height: 44px;}#viewport .waiting-to-help header #message > .inner {  text-align: center;  height: 22px;  margin-top: -11px;}#viewport .waiting-to-help footer {  position: absolute;  left: 0;  right: 0;  bottom: 0;  height: 100px;}#viewport .waiting-to-help footer > .inner {  height: 68px;  margin-top: -34px;}#viewport .waiting-to-help .agent-image {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  z-index: 1;}#viewport .waiting-to-help [type="button"],#viewport .waiting-to-help .link {  cursor: pointer;  color: #FFF;}#viewport .waiting-to-help [type="button"] {  line-height: 1;  letter-spacing: .02em;  border: 1px solid rgba(0, 0, 0, 0.2);  padding: 12px 24px;  font-size: 15px;  border-radius: 3px;  margin-bottom: 8px;  font-weight: bold;}#viewport .waiting-to-help .link {  font-size: 14px;  text-decoration: underline;}#viewport #view-container {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  padding: 15px;  font-size: 14px;  font-family: Helvetica, Arial, Sans-serif;  background-color: #F1F1F1;}#viewport button,#viewport [acif-action="exit"] {  cursor: pointer;}#viewport .inline {  display: inline;}#viewport .inline fieldset,#viewport .inline div,#viewport .inline p {  display: inline;}#viewport .anchor,#viewport .anchor button {  cursor: pointer;  margin: 0;  padding: 0;  color: purple;  text-decoration: underline;  background-color: transparent;  border: 0;}#viewport .strong {  font-weight: bold;}#viewport .normal {  color: inherit;  text-decoration: inherit;}#viewport .buffer {  margin: 15px 0px;}#viewport .line-spacing {  line-height: 1.5em;}#viewport fieldset.list legend {  width: 100%;}#viewport fieldset.list button:hover,#viewport fieldset.list label.button:hover {  border-left-color: #75206e;  background-color: rgba(255, 255, 255, 0.8);}#viewport fieldset.list button:focus,#viewport fieldset.list label.button:focus {  border-left-color: #75206e;  background-color: rgba(255, 255, 255, 0.8);}#viewport #message,#viewport footer {  background-color: #75206e;}#viewport .agent-image {  background: #75206e url("https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/agent_male.jpg") no-repeat center -36px;  background-size: cover;}#viewport [type="button"] {  background-color: #A576BA;}';
});
define('Automatons/styles/2006', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {    /* Request to Chat */  /* Dixons Global */}#viewport html,#viewport body,#viewport div,#viewport span,#viewport applet,#viewport object,#viewport iframe,#viewport h1,#viewport h2,#viewport h3,#viewport h4,#viewport h5,#viewport h6,#viewport p,#viewport blockquote,#viewport pre,#viewport a,#viewport abbr,#viewport acronym,#viewport address,#viewport big,#viewport cite,#viewport code,#viewport del,#viewport dfn,#viewport em,#viewport img,#viewport ins,#viewport kbd,#viewport q,#viewport s,#viewport samp,#viewport small,#viewport strike,#viewport strong,#viewport sub,#viewport sup,#viewport tt,#viewport var,#viewport b,#viewport u,#viewport i,#viewport center,#viewport dl,#viewport dt,#viewport dd,#viewport ol,#viewport ul,#viewport li,#viewport fieldset,#viewport form,#viewport label,#viewport legend,#viewport table,#viewport caption,#viewport tbody,#viewport tfoot,#viewport thead,#viewport tr,#viewport th,#viewport td,#viewport article,#viewport aside,#viewport canvas,#viewport details,#viewport embed,#viewport figure,#viewport figcaption,#viewport footer,#viewport header,#viewport hgroup,#viewport menu,#viewport nav,#viewport output,#viewport ruby,#viewport section,#viewport summary,#viewport time,#viewport mark,#viewport audio,#viewport video {  margin: 0;  padding: 0;  border: 0;  font-size: 100%;  font: inherit;  vertical-align: baseline;}#viewport article,#viewport aside,#viewport details,#viewport figcaption,#viewport figure,#viewport footer,#viewport header,#viewport hgroup,#viewport menu,#viewport nav,#viewport section {  display: block;}#viewport body {  line-height: 1;}#viewport ol,#viewport ul {  list-style: none;}#viewport blockquote,#viewport q {  quotes: none;}#viewport blockquote:before,#viewport blockquote:after,#viewport q:before,#viewport q:after {  content: "";  content: none;}#viewport table {  border-collapse: collapse;  border-spacing: 0;}#viewport form legend {  margin-bottom: 15px;}#viewport form fieldset.list button,#viewport form fieldset.list label.button {  margin-top: 10px;  color: #551A8B;  text-decoration: underline;  cursor: pointer;  margin: 2px 0px;  padding: 10px 0px 10px 15px;  display: block;  width: 100%;  text-align: left;  border: 0px;  border-left: 5px solid transparent;  background-color: transparent;  transition: border-color 0.4s ease, background-color 0.4s ease;}#viewport form fieldset.list button input,#viewport form fieldset.list label.button input {  display: none;}#viewport #loading-image {  display: block;  margin: 20px auto;  height: 200px;}#viewport .waiting-to-help {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  color: #FFF;  text-align: center;  background-repeat: no-repeat;  background-size: cover;}#viewport .waiting-to-help header,#viewport .waiting-to-help footer {  z-index: 2;}#viewport .waiting-to-help header .inner,#viewport .waiting-to-help footer .inner {  position: absolute;  top: 50%;  width: 100%;}#viewport .waiting-to-help header {  position: relative;  font-size: 18px;  text-align: left;  background-color: #FFF;  height: 52px;}#viewport .waiting-to-help header #header-image {  padding-left: 2%;  width: 85%;}#viewport .waiting-to-help header #close-button {  position: absolute;  top: 0;  right: 0;  height: 20px;  padding: 15px;}#viewport .waiting-to-help header #message {  position: relative;  height: 44px;}#viewport .waiting-to-help header #message > .inner {  text-align: center;  height: 22px;  margin-top: -11px;}#viewport .waiting-to-help footer {  position: absolute;  left: 0;  right: 0;  bottom: 0;  height: 100px;}#viewport .waiting-to-help footer > .inner {  height: 68px;  margin-top: -34px;}#viewport .waiting-to-help .agent-image {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  z-index: 1;}#viewport .waiting-to-help [type="button"],#viewport .waiting-to-help .link {  cursor: pointer;  color: #FFF;}#viewport .waiting-to-help [type="button"] {  line-height: 1;  letter-spacing: .02em;  border: 1px solid rgba(0, 0, 0, 0.2);  padding: 12px 24px;  font-size: 15px;  border-radius: 3px;  margin-bottom: 8px;  font-weight: bold;}#viewport .waiting-to-help .link {  font-size: 14px;  text-decoration: underline;}#viewport #view-container {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  padding: 15px;  font-size: 14px;  font-family: Helvetica, Arial, Sans-serif;  background-color: #F1F1F1;}#viewport button,#viewport [acif-action="exit"] {  cursor: pointer;}#viewport .inline {  display: inline;}#viewport .inline fieldset,#viewport .inline div,#viewport .inline p {  display: inline;}#viewport .anchor,#viewport .anchor button {  cursor: pointer;  margin: 0;  padding: 0;  color: purple;  text-decoration: underline;  background-color: transparent;  border: 0;}#viewport .strong {  font-weight: bold;}#viewport .normal {  color: inherit;  text-decoration: inherit;}#viewport .buffer {  margin: 15px 0px;}#viewport .line-spacing {  line-height: 1.5em;}#viewport fieldset.list legend {  width: 100%;}#viewport fieldset.list button:hover,#viewport fieldset.list label.button:hover {  border-left-color: #19225B;  background-color: rgba(255, 255, 255, 0.8);}#viewport fieldset.list button:focus,#viewport fieldset.list label.button:focus {  border-left-color: #19225B;  background-color: rgba(255, 255, 255, 0.8);}#viewport #message,#viewport footer {  background-color: #19225B;}#viewport .agent-image {  background: #19225B url("https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/agent_female.jpg") no-repeat center center;  background-size: contain;}#viewport [type="button"] {  background-color: #656EA5;}';
});
define('Automatons/styles/2010', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {    /* base formify styles */}#viewport html,#viewport body,#viewport div,#viewport span,#viewport applet,#viewport object,#viewport iframe,#viewport h1,#viewport h2,#viewport h3,#viewport h4,#viewport h5,#viewport h6,#viewport p,#viewport blockquote,#viewport pre,#viewport a,#viewport abbr,#viewport acronym,#viewport address,#viewport big,#viewport cite,#viewport code,#viewport del,#viewport dfn,#viewport em,#viewport img,#viewport ins,#viewport kbd,#viewport q,#viewport s,#viewport samp,#viewport small,#viewport strike,#viewport strong,#viewport sub,#viewport sup,#viewport tt,#viewport var,#viewport b,#viewport u,#viewport i,#viewport center,#viewport dl,#viewport dt,#viewport dd,#viewport ol,#viewport ul,#viewport li,#viewport fieldset,#viewport form,#viewport label,#viewport legend,#viewport table,#viewport caption,#viewport tbody,#viewport tfoot,#viewport thead,#viewport tr,#viewport th,#viewport td,#viewport article,#viewport aside,#viewport canvas,#viewport details,#viewport embed,#viewport figure,#viewport figcaption,#viewport footer,#viewport header,#viewport hgroup,#viewport menu,#viewport nav,#viewport output,#viewport ruby,#viewport section,#viewport summary,#viewport time,#viewport mark,#viewport audio,#viewport video {  margin: 0;  padding: 0;  border: 0;  font-size: 100%;  font: inherit;  vertical-align: baseline;}#viewport article,#viewport aside,#viewport details,#viewport figcaption,#viewport figure,#viewport footer,#viewport header,#viewport hgroup,#viewport menu,#viewport nav,#viewport section {  display: block;}#viewport body {  line-height: 1;}#viewport ol,#viewport ul {  list-style: none;}#viewport blockquote,#viewport q {  quotes: none;}#viewport blockquote:before,#viewport blockquote:after,#viewport q:before,#viewport q:after {  content: "";  content: none;}#viewport table {  border-collapse: collapse;  border-spacing: 0;}#viewport a,#viewport blockquote,#viewport button,#viewport fieldset,#viewport form,#viewport h1,#viewport h2,#viewport h3,#viewport h4,#viewport h5,#viewport h6,#viewport input,#viewport legend,#viewport li,#viewport ol,#viewport p,#viewport pre,#viewport td,#viewport textarea,#viewport th,#viewport ul {  margin: 0;  padding: 0;  border: none;}#viewport table {  border-collapse: collapse;  border-spacing: 0;}#viewport fieldset,#viewport img {  border: 0;}#viewport em,#viewport strong,#viewport th {  font-style: normal;  font-weight: normal;}#viewport ol,#viewport ul {  list-style: none;}#viewport th {  text-align: left;}#viewport h1,#viewport h2,#viewport h3,#viewport h4,#viewport h5,#viewport h6 {  font-size: 100%;  font-weight: normal;}#viewport abbr,#viewport acronym {  border: 0;  font-variant: normal;}#viewport sup {  vertical-align: text-top;}#viewport sub {  vertical-align: text-bottom;}#viewport input,#viewport select,#viewport textarea {  font-family: inherit;  font-size: inherit;  font-weight: inherit;}#viewport input,#viewport select,#viewport textarea {  *font-size: 100%;}#viewport .view-container {  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;}#viewport *,#viewport *:after,#viewport *:before,#viewport [class*="formify-"] {  -webkit-box-sizing: inherit;  -moz-box-sizing: inherit;  box-sizing: inherit;}#viewport .view-container {  overflow-y: auto;  position: absolute;  top: 0;  bottom: 0;  right: 0;  left: 0;  padding: 20px;}#viewport .formify-form-body {  display: block;  margin-bottom: 1em;}#viewport .formify-heading {  font-weight: bold;  margin-bottom: 1em;  font-size: 1.125em;  line-height: 1.4em;}#viewport .formify-header {  display: block;  height: auto;  margin-bottom: 1em;}#viewport .formify-fieldset-radio .formify-label,#viewport .formify-fieldset-checkbox .formify-label {  display: block;  float: left;  clear: left;  margin: 0.5em 0;  vertical-align: middle;}#viewport .formify-fieldset-radio .formify-label .formify-input,#viewport .formify-fieldset-checkbox .formify-label .formify-input,#viewport .formify-fieldset-radio .formify-label span,#viewport .formify-fieldset-checkbox .formify-label span {  display: inline-block;  vertical-align: middle;}#viewport .formify-fieldset-radio .formify-label span,#viewport .formify-fieldset-checkbox .formify-label span {  margin-left: 0.125em;}#viewport .formify-fieldset-inline .formify-label {  clear: none;  margin: 0.5em 1.5em 0.5em 0;}#viewport .formify-legend {  float: left;  width: 100%;  margin-bottom: 1em;}#viewport .formify-scale-statement .formify-legend {  margin-bottom: 0;  padding: 0.25em 0;}#viewport .formify-label,#viewport .formify-legend {  font-weight: normal;  font-size: 1em;  line-height: 1.4em;}#viewport .formify-fieldset-email .formify-input,#viewport .formify-fieldset-select .formify-input,#viewport .formify-fieldset-text .formify-input,#viewport .formify-fieldset-textarea .formify-input {  margin-top: 0.5em;  clear: left;  background-color: white;  border: 1px solid #aaa;  display: block;  border-radius: 3px;  padding: 0.25em;  width: 100%;}@media only screen and (min-width: 320px) {  #viewport .formify-input {    max-width: 240px;  }}#viewport .formify-fieldset-textarea .formify-input {  width: 100%;  max-width: 100%;  height: 180px;}#viewport .formify-fieldset-radio .formify-input,#viewport .formify-fieldset-checkbox .formify-input,#viewport .formify-fieldset-radio .formify-label,#viewport .formify-fieldset-checkbox .formify-label,#viewport .formify-scale-input,#viewport .formify-scale-option,#viewport .formify-select .formify-input,#viewport .formify-submit {  cursor: pointer;}#viewport .formify-submit {  display: block;  width: 100%;  padding: 1em;  border-radius: 3px;  color: #fff;  margin-left: auto;  margin-right: auto;}#viewport .formify-submit:focus {  outline-offset: -4px;  outline: 1px dotted #000;}#viewport .formify-group {  display: block;  position: static;  border-top: 1px solid #ccc !important;  padding: 10px 0;  margin: 0;}#viewport .formify-group [class*="formify-fieldset"] {  border-top: 0;}#viewport [class*="formify-fieldset"] {  padding: 10px 0;  margin: 0;  position: relative;  border-top: 1px solid #ccc !important;}#viewport .formify-scale-row.formify-scale-header {  display: none;}#viewport .formify-scale-cell {  font-weight: normal;  display: block;  margin: 1em 0;  font-size: 1em;}#viewport .formify-scale-option span {  display: inline-block;  vertical-align: middle;}#viewport .formify-scale-input {  display: inline-block;  vertical-align: middle;}@media only screen and (min-width: 320px) {  #viewport .formify-scale-body {    margin-top: 1em;  }  #viewport .formify-scale-row {    margin-top: 0.5em;    display: table;    width: 100%;    border-collapse: collapse;  }  #viewport .formify-scale-row.formify-scale-header {    display: table;    margin-top: 1em;  }  #viewport .formify-scale-cell {    display: table-cell;    width: auto;    float: none;    text-align: center;    vertical-align: middle;  }  #viewport .formify-scale-statement {    display: table-cell;    width: 50%;    text-align: left;  }  #viewport .formify-scale-option span {    display: none;  }}#viewport #view-container {  font-family: sans-serif;  font-size: 12px;  text-align: left;}#viewport #view-container .formify-heading {  color: #000;  font-size: 1.1em;  font-weight: bold;  line-height: 1.2em;  margin-bottom: 0.3em;}#viewport #view-container .req-label {  color: #ff0000;}#viewport #view-container .formify-heading-required {  display: none;}#viewport #view-container .formify-submit {  background-color: buttonface;  border-style: outset;  border-left: 1px solid #ccc;  border-top: 1px solid #ccc;  border-width: 1px;  color: #000;  height: auto;  padding: 5px 10px;  width: auto;}#viewport #view-container select[class$="formify-input"] {  padding: 0.25em;  width: 60%;  height: auto;}#viewport #view-container div[acif-fieldset-group] fieldset[class*="formify-fieldset-select"] {  border: none !important;}#viewport #view-container fieldset[class*="formify-fieldset"][acif-required="true"][class*="invalid"] {  padding-top: 30px;}#viewport #view-container textarea[class$="formify-input"] {  height: 100px;}#viewport #view-container fieldset[class*="formify-fieldset"] label {  color: #000;  text-align: left;  text-transform: initial;  width: auto;}#viewport #view-container select,#viewport #view-container textarea {  background-color: #fff;  border: 1px solid #aaa;}#viewport #view-container footer {  background-color: inherit;  text-align: center;}#viewport #thankYou {  color: #000;  display: table;  font-size: 16px;  height: 100%;  text-align: center;  width: 100%;}#viewport #thankYou .lead {  font-size: 1.2em;  font-weight: normal;  color: #9C9A9C;  line-height: 1.2em;  margin-bottom: 15px;  margin-top: 0.4em;  text-align: center;}#viewport #thankYou p {  font-size: 1.1em;}#viewport #thankYou div.center-container {  display: table-cell;  vertical-align: middle;}';
});
define('Automatons/styles/2012', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {  }#viewport .wrapper {  font-family: Helvetica, Arial, Sans-serif;  box-sizing: border-box;  padding: 20px 18px;  color: #434342;  /*        height: 100%;    width: 100%;    background-color: #F2F1EF;*/}#viewport h1 {  margin: 10px auto;  text-align: center;  font-size: 19px;  font-weight: 500;  color: #333;}#viewport h2 {  margin: 10px 0px;  font-size: 13px;  font-weight: 900;}#viewport .button-group {  text-align: center;  margin-top: 22px;}#viewport .button-group .button {  display: inline-block;  margin: 2px;  padding: 0px 40px;  height: 34px;  font-size: 15px;  background: #817F79;  color: white;  box-sizing: border-box;  border: 2px solid white;}#viewport .guide-1 ul {  margin-top: 24px;}#viewport .guide-1 li {  list-style: none;  margin: 18px 0px;}#viewport .guide-2 {  max-width: 300px;  margin: 0 auto;}#viewport .guide-2 h2 {  margin: 0px;  margin-bottom: 12px;  font-size: 15px;  font-weight: 600;}#viewport .guide-2 ul {  padding: 0px;}#viewport .guide-2 li {  list-style: none;  padding: 2px 15px;}#viewport .guide-2 li a {  text-decoration: none;  color: #434342;}#viewport .guide-2 li:hover {  background: white;}#viewport .guide-2 li:before {  content: "";  border-color: transparent #404650;  border-style: solid;  border-width: 6px 0 6px 8px;  display: inline-block;  margin-right: 14px;}#viewport .dialog h1 {  max-width: 300px;}#viewport .self-help {  padding: 24px 30px;  line-height: 23px;}#viewport .self-help h1 {  margin: 16px auto;}#viewport .self-help p {  font-size: 15px;  line-height: 23px;}#viewport .self-help-2 {  padding: 10px 26px;  font-size: 14px;}#viewport .self-help-2 h1 {  margin: 11px auto;  margin-bottom: 13px;  font-size: 19px;  line-height: 24px;  font-weight: 600;}#viewport .self-help-2 ul {  list-style: none;}#viewport .self-help-2 small {  display: block;  margin-bottom: 14px;  font-size: 13px;}';
});
define('Automatons/styles/2013', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {  }#viewport .wrapper {  font-family: Helvetica, Arial, Sans-serif;  box-sizing: border-box;  padding: 20px 18px;  color: #434342;}#viewport .self-help {  padding: 24px 30px;  line-height: 23px;}#viewport .self-help p {  font-size: 15px;  line-height: 23px;}';
});
define('Automatons/styles/2014', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {  }#viewport .wrapper {  font-family: Helvetica, Arial, Sans-serif;  box-sizing: border-box;  padding: 20px 18px;  color: #434342;}#viewport h1 {  margin: 10px auto;  text-align: center;  font-size: 19px;  font-weight: 500;  color: #333;}#viewport h2 {  margin: 10px 0;  font-size: 13px;  font-weight: 900;}#viewport .button-group {  text-align: center;  margin-top: 22px;}#viewport .button-group .button {  display: inline-block;  margin: 2px;  padding: 0 40px;  height: 34px;  font-size: 15px;  background: #817F79;  color: white;  box-sizing: border-box;  border: 2px solid white;}#viewport .guide-1 ul {  margin-top: 24px;}#viewport .guide-1 li {  list-style: none;  margin: 18px 0;}#viewport .guide-2 {  max-width: 300px;  margin: 0 auto;}#viewport .guide-2 h2 {  margin: 0;  margin-bottom: 12px;  font-size: 15px;  font-weight: 600;}#viewport .guide-2 ul {  padding: 0;}#viewport .guide-2 li {  list-style: none;  padding: 2px 15px;}#viewport .guide-2 li a {  text-decoration: none;  color: #434342;}#viewport .guide-2 li:hover {  background: white;}#viewport .guide-2 li:before {  content: "";  border-color: transparent #404650;  border-style: solid;  border-width: 6px 0 6px 8px;  display: inline-block;  margin-right: 14px;}#viewport .dialog h1 {  max-width: 300px;}#viewport .self-help {  padding: 24px 30px;  line-height: 23px;}#viewport .self-help h1 {  margin: 16px auto;}#viewport .self-help p {  font-size: 15px;  line-height: 23px;}#viewport .self-help-2 {  padding: 10px 26px;  font-size: 14px;}#viewport .self-help-2 h1 {  margin: 11px auto;  margin-bottom: 13px;  font-size: 19px;  line-height: 24px;  font-weight: 600;}#viewport .self-help-2 ul {  list-style: none;}#viewport .self-help-2 small {  display: block;  margin-bottom: 14px;  font-size: 13px;}';
});
define('Automatons/styles/2015', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = '#viewport {  }#viewport .wrapper {  font-family: Helvetica, Arial, Sans-serif;  box-sizing: border-box;  padding: 20px 18px;  color: #434342;}#viewport .self-help {  padding: 24px 30px;  line-height: 23px;}#viewport .self-help p {  font-size: 15px;  line-height: 23px;}';
});
define("Automatons/templates/2001", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div id=\"custom-viewport\">    <header class=\"titlebar\">      <span class=\"close\" acif-action=\"exit\">&times;</span>                 </header>    <div id=\"viewport-outlet\"></div></div>";
});
define("Automatons/templates/2002", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<%\tconst MEDIA_URL = 'https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/';\tvar headerImage = MEDIA_URL + image_title;\tvar closeImage = MEDIA_URL + image_close;%><div id=\"<%= name %>\" class=\"waiting-to-help\">    <header>        <img id=\"header-image\" src=\"<%= headerImage %>\" />        <img id=\"close-button\" src=\"<%= closeImage %>\" acif-action=\"exit\"/>        <div id=\"message\">        \t<p class=\"inner\">We're waiting to help if you need us</p>        </div>    </header>    <div class=\"agent-image\"></div>    <footer>        <div class=\"inner\">            <input type=\"button\" acif-node=\"<%= node_id %>\" value=\"Start live chat\"/>            <div acif-action=\"exit\" class=\"link\">No thanks</div>        </div>    </footer></div>";
});
define("Automatons/templates/2003", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"routing\">    <form acif-next-transition=\"route\" acif-submit-on-click>        <fieldset name=\"Reason for Assist\" type=\"radio\" class=\"list buffer\">          <legend class=\"strong cushion\">We noticed you may need help with your visit. Can we assist you with any of the following?</legend>          <label class=\"button\">            Making a purchase            <input value=\"Making a purchase\">          </label>          <label class=\"button\">            Return or exchange a purchased item            <input value=\"Return or exchange a purchased item\">          </label>          <label class=\"button\">            Support for a purchase you previously made            <input value=\"Support for a purchase you previously made\">          </label>          <label class=\"button\">            Track your delivery            <input value=\"Track your delivery\">          </label>          <label class=\"button\">            Check stock levels in my local store            <input value=\"Check stock levels in my local storee\">          </label>        </fieldset>    </form></div>";
});
define("Automatons/templates/2004", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<p class=\"strong\">One of our customer service colleagues are waiting to help you!</p><p class=\"buffer\">Please call us on <a href=\"tel:0344-561-1234\" class=\"normal\">0344 561 1234</a> for assistance.</p><p class=\"buffer line-spacing\">    Monday to Friday: 8am - 8pm <br/>    Saturday: 8am - 6pm <br/>    Sunday: 9am - 6pm</p><div class=\"buffer\">    Please     <span acif-node=\"<%= loading_redirect_node_id %>\" class=\"anchor\">click here</span>    to view our most frequently asked questions.</div>";
});
define("Automatons/templates/2005", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<p class=\"buffer strong\">Please wait a moment while we redirect you to a page that can help you with your inquiry</p><img id=\"loading-image\" alt=\"360 loading icon\" src=\"<%= loading_gif_url %>\"/>";
});
define("Automatons/templates/2006", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div id=\"thankYou\">    <div class=\"center-container\">        <p class=\"lead\">Your feedback has been submitted!</p>        <p>Thank you for your time and participation in the survey.</p>    </div></div>";
});
define("Automatons/templates/2012", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<p>This is an auto-generated email to inform you a respondent provided a high satisfaction rating. Please click on the following link <a href=\"https://portal-dixons.touchcommerce.com/portal/portal.jsp#transcript_10004048_engagementID:[engagement-id]:transcript\">https://portal-dixons.touchcommerce.com/portal/portal.jsp#transcript_10004048_engagementID:[engagement-id]:transcript</a> to view the survey.</p><p>ChatID: [engagement-id]</p><p>AgentID: [agent-id]</p>";
});
define("Automatons/templates/2016", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<p>This is an auto-generated email to inform you a respondent provided a low satisfaction rating. Please click on the following link <a href=\"https://portal-dixons.touchcommerce.com/portal/portal.jsp#transcript_10004048_engagementID:[engagement-id]:transcript\">https://portal-dixons.touchcommerce.com/portal/portal.jsp#transcript_10004048_engagementID:[engagement-id]:transcript</a> to view the survey.</p><p>ChatID: [engagement-id]</p><p>AgentID: [agent-id]</p>";
});
define("Automatons/templates/2023", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<form class=\"formify-form\" <%= formify._attrs %> novalidate>  <div class=\"formify-form-body\">    <div acif-template=\"formify-header\"></div>    <% _.each(formify.fields, function(field) { %>      <% if (field.fields) { %>        <% _.each(field.fields, function(groupItem){ %>          <% if (groupItem._order === 1) { %>            <div class=\"formify-group\" data-fieldset-group>            <h2><%= this.group %></h2>          <% } %>            <div acif-template=\"formify-type\"></div>          <% if (groupItem._order === this._size) { %>            </div>          <% } %>        <% }, field); %>    <% } %>      <div acif-template=\"formify-type\"></div>    <% }); %>  </div>  <% if (!formify.submitOnClick) { %>    <div class=\"formify-footer\">  \t\t<button class=\"formify-submit\" type=\"submit\" <%= formify._toggle_attr %>><%= formify.submit %></button>\t</div>  <% } %></form>";
});
define("Automatons/templates/2024", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>May we assist with a delivery that is due today?</h1>    <div class=\"button-group\">        <button class=\"button\" acif-transition=\"yes\">YES</button>        <button class=\"button\" acif-transition=\"no\">NO</button>    </div></div>";
});
define("Automatons/templates/2025", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Did you buy your item online or in&#8209;store?</h1>    <div class=\"button-group\">        <button acif-transition=\"online\" class=\"button\" href=\"#\">ONLINE</button>        <button acif-transition=\"instore\" class=\"button\" href=\"#\">IN&#8209;STORE</button>    </div></div>";
});
define("Automatons/templates/2026", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Do you want to check your delivery timeslot?</h1>    <div class=\"button-group\">        <button class=\"button\" acif-transition=\"yes\">YES</button>        <button class=\"button\" acif-transition=\"no\">NO</button>    </div></div>";
});
define("Automatons/templates/2027", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div acif-node=\"node::1393\" style=\"position: absolute; top: 0px; right: 0px; cursor:pointer\">\t<img src=\"https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/btn-close.png\" alt=\"Close\" /></div><div acif-node=\"node::1394\" style=\"height: 375px\">\t<img src=\"https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/installation-invite-spring-v4.png\" alt=\"Save up to £40 on our built in installation service\" /></div><% if(api.map.FoundSku == 1) { %><div acif-node=\"node::1397\" style=\"height: 68px; cursor:pointer\">\t<img src=\"https://media-eu1.inq.com/media/sites/10004048/flash/Common-Assets/Images/AddToBasket.png\" alt=\"Add to basket\" style=\"position: absolute; margin: auto; left: 0; right: 0; padding-bottom: 20px;\" /></div> <% } %><div acif-node=\"node::1395\" id=\"timeOutNode\"></div>";
});
define("Automatons/templates/2028", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. Please can you contact us on <strong>0344&nbsp;5611234</strong> to conduct a review and see how we can support you.</p>    <p>You will need the make, model, order details, and description of the damage. For large box items such as a Washer/Fridge Freezer we may also require the serial number of the product.</p></div>";
});
define("Automatons/templates/2029", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>You may need to reset your password. It will take up to 24 hours for the system to register your new password.</p>    <p>To do this, click on the Forgot password? link under the password field. Follow the instructions on screen and we will send you a link to reset your password.</p></div>";
});
define("Automatons/templates/2030", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help-2\">    <h1>One of our customer service colleagues are waiting to help you!</h1>    <small>Please call use on: <strong>0344&nbsp;5610000</strong> for assistance</small>    <ul>        <li>Monday to Friday: 8am - 8pm</li>        <li>Saturday: 8am - 6pm</li>        <li>Sunday: 9am - 6pm</li>    </ul>    <p>Please <a acif-transition=\"redirect\" href=\"#\">click here</a> to view our most frequently asked questions.</p></div>";
});
define("Automatons/templates/2031", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help-2\">    <h1>One of our customer service colleagues are waiting to help you!</h1>    <small>Please call use on: <strong>0344&nbsp;5611234</strong> for assistance</small>    <ul>        <li>Monday to Friday: 8am - 8pm</li>        <li>Saturday: 8am - 6pm</li>        <li>Sunday: 9am - 6pm</li>    </ul>    <p>Please <a href=\"#\" acif-transition=\"redirect\">click here</a> to view our most frequently asked questions.</p></div>";
});
define("Automatons/templates/2032", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper guide-2\">    <h2>What is your call about?</h2>    <ul>        <li><a acif-transition=\"instructions\" href=\"#\">Instructions for the driver</a></li>        <li><a acif-transition=\"timeslot\" href=\"#\">Amend - Timeslot (Paid)</a></li>        <li><a acif-transition=\"date\" href=\"#\">Amend - Date</a></li>        <li><a acif-transition=\"phone\" href=\"#\">Amend - Phone Number</a></li>\t\t<li><a acif-transition=\"address\" href=\"#\">Amend - Address</a></li>        <li><a acif-transition=\"track\" href=\"#\">Track</a></li>        <li><a acif-transition=\"cancel\" href=\"#\">Cancel</a></li>        <li><a acif-transition=\"addremove\" href=\"#\">Add or Remove Service</a></li>        <li><a acif-transition=\"else\" href=\"#\">Anything Else</a></li>    </ul></div>";
});
define("Automatons/templates/2033", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper guide-1\">    <h2>We noticed you may need help with your visit. Can we assist you with any of the following?</h2>    <ul>        <li><a acif-transition=\"purchase\" href=\"#\">Making a purchase</a></li>        <li><a acif-transition=\"track\" href=\"#\">Track your delivery</a></li>        <li><a acif-transition=\"return\" href=\"#\">Return or exchange a purchased item</a></li>        <li><a acif-transition=\"repair\" href=\"#\">Book a repair</a></li>        <li><a acif-transition=\"support\" href=\"#\">Support for a purchase you previously made</a></li>    </ul></div>";
});
define("Automatons/templates/2034", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help-2\">    <h1>One of our customer service colleagues are waiting to help you!</h1>    <small>Please call use on: <strong>0344&nbsp;5611234</strong> for assistance</small>    <ul>        <li>Monday to Friday: 8am - 8pm</li>        <li>Saturday: 8am - 6pm</li>        <li>Sunday: 9am - 6pm</li>    </ul>    <p>Please <a acif-transition=\"redirect\" href=\"#\">click here</a> to view our most frequently asked questions.</p></div>";
});
define("Automatons/templates/2035", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div id=\"thankYou\">    <div class=\"center-container\">        <p class=\"lead\">Your feedback has been submitted!</p>        <p>Thank you for your time and participation in the survey.</p>    </div></div>";
});
define("Automatons/templates/2036", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>You may need to reset your password. It will take up to 24 hours for the system to register your new password.</p>    <p>To do this, click on the Forgot password? link under the password field. Follow the instructions on screen and we will send you a link to reset your password.</p></div>";
});
define("Automatons/templates/2037", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Do you need to know who to contact to book a new repair?</h1>    <div class=\"button-group\">        <button acif-transition=\"yes\" class=\"button\" href=\"#\">YES</button>        <button acif-transition=\"no\" class=\"button\" href=\"#\">NO</button>    </div></div>";
});
define("Automatons/templates/2038", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help-2\">    <h1>One of our customer service colleagues are waiting to help you!</h1>    <small>Please call use on: <strong>0344&nbsp;5611234</strong> for assistance</small>    <ul>        <li>Monday to Friday: 8am - 8pm</li>        <li>Saturday: 8am - 6pm</li>        <li>Sunday: 9am - 6pm</li>    </ul>    <p>Please <a acif-transition=\"redirect\" href=\"#\">click here</a> to view our most frequently asked questions.</p></div>";
});
define("Automatons/templates/2039", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Did you buy your item online or in&#8209;store?</h1>    <div class=\"button-group\">        <button acif-transition=\"online\" class=\"button\" href=\"#\">ONLINE</button>        <button acif-transition=\"instore\" class=\"button\" href=\"#\">IN&#8209;STORE</button>    </div></div>";
});
define("Automatons/templates/2040", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper guide-2\">    <h2>What is your call about?</h2>    <ul>        <li><a acif-transition=\"instructions\" href=\"#\">Instructions for the driver</a></li>        <li><a acif-transition=\"timeslot\" href=\"#\">Amend - Timeslot (Paid)</a></li>        <li><a acif-transition=\"date\" href=\"#\">Amend - Date</a></li>        <li><a acif-transition=\"phone\" href=\"#\">Amend - Phone Number</a></li>\t\t<li><a acif-transition=\"address\" href=\"#\">Amend - Address</a></li>        <li><a acif-transition=\"track\" href=\"#\">Track</a></li>        <li><a acif-transition=\"cancel\" href=\"#\">Cancel</a></li>        <li><a acif-transition=\"addremove\" href=\"#\">Add or Remove Service</a></li>        <li><a acif-transition=\"else\" href=\"#\">Anything Else</a></li>    </ul></div>";
});
define("Automatons/templates/2041", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help-2\">    <h1>One of our customer service colleagues are waiting to help you!</h1>    <small>Please call use on: <strong>0344&nbsp;5611234</strong> for assistance</small>    <ul>        <li>Monday to Friday: 8am - 8pm</li>        <li>Saturday: 8am - 6pm</li>        <li>Sunday: 9am - 6pm</li>    </ul>    <p>Please <a href=\"#\" acif-transition=\"redirect\">click here</a> to view our most frequently asked questions.</p></div>";
});
define("Automatons/templates/2042", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <h1 class=\"text-center\">For a full list of our services and prices, please visit <a href=\"#\" acif-transition=\"redirect\">TKH.com</a>.</h1>    <h1 class=\"text-center\">To arrange the addition or removal of one of these, you will need to speak to one of my colleagues on <strong>0344&nbsp;5611234</strong>.</h1></div>";
});
define("Automatons/templates/2043", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper guide-2\">    <h2>What is your query about?</h2>    <ul>        <li><a acif-transition=\"order_cancellation\" href=\"#\">Order Cancellation</a></li>        <li><a acif-transition=\"change_of_mind\" href=\"#\">Change of mind</a></li>        <li><a acif-transition=\"damaged\" href=\"#\">Damaged</a></li>        <li><a acif-transition=\"faulty\" href=\"#\">Faulty</a></li>        <li><a acif-transition=\"wrong_item\" href=\"#\">Wrong Item</a></li>        <li><a acif-transition=\"anything_else\" href=\"#\">Anything Else</a></li>    </ul></div>";
});
define("Automatons/templates/2044", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. Please return to the store with the receipt, the card that you paid with, the product if you collected it from store, as well as the details of the product you were expecting.</p></div>";
});
define("Automatons/templates/2045", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. Please return to the store with the receipt, the card that you paid with, the product if you collected it from store, as well as the details of the product you were expecting.</p></div>";
});
define("Automatons/templates/2046", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div acif-template=\"formify\"></div>";
});
define("Automatons/templates/2047", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. Please can you contact us on <strong>0344 5611234</strong> to conduct a review and see how we can support you.</p>    <p>You will need the order details, including make and model of the product and a description of the damage.</p></div>";
});
define("Automatons/templates/2048", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. If the damaged product is a large box item such as a Washer/Fridge Freezer, plase call us on <strong>0344&nbsp;5611234</strong> with the following details: make, model, receipt details, serial number and description of the damage. For small items such as laptops, TVs under 32\" and cameras, you can return to the store with receipt, the card that you paid with and product.</p></div>";
});
define("Automatons/templates/2049", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>May we assist with a delivery that is due today?</h1>    <div class=\"button-group\">        <button class=\"button\" acif-transition=\"yes\">YES</button>        <button class=\"button\" acif-transition=\"no\">NO</button>    </div></div>";
});
define("Automatons/templates/2050", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. If the damaged product is a large box item such as a Washer/Fridge Freezer, plase call us on <strong>0344&nbsp;5611234</strong> with the following details: make, model, receipt details, serial number and description of the damage. For small items such as laptops, TVs under 32\" and cameras, you can return to the store with receipt, the card that you paid with and product.</p></div>";
});
define("Automatons/templates/2051", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div acif-template=\"formify\"></div>";
});
define("Automatons/templates/2052", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Do you want to check your delivery timeslot?</h1>    <div class=\"button-group\">        <button class=\"button\" acif-transition=\"yes\">YES</button>        <button class=\"button\" acif-transition=\"no\">NO</button>    </div></div>";
});
define("Automatons/templates/2053", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper guide-1\">    <h2>We noticed you may need help with your visit. Can we assist you with any of the following?</h2>    <ul>        <li><a acif-transition=\"purchase\" href=\"#\">Making a purchase</a></li>        <li><a acif-transition=\"track\" href=\"#\">Track your delivery</a></li>        <li><a acif-transition=\"return\" href=\"#\">Return or exchange a purchased item</a></li>        <li><a acif-transition=\"repair\" href=\"#\">Book a repair</a></li>        <li><a acif-transition=\"support\" href=\"#\">Support for a purchase you previously made</a></li>    </ul></div>";
});
define("Automatons/templates/2054", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Do you need to know who to contact to book a new repair?</h1>    <div class=\"button-group\">        <button acif-transition=\"yes\" class=\"button\" href=\"#\">YES</button>        <button acif-transition=\"no\" class=\"button\" href=\"#\">NO</button>    </div></div>";
});
define("Automatons/templates/2055", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help-2\">    <h1>One of our customer service colleagues are waiting to help you!</h1>    <small>Please call use on: <strong>0344&nbsp;5610000</strong> for assistance</small>    <ul>        <li>Monday to Friday: 8am - 8pm</li>        <li>Saturday: 8am - 6pm</li>        <li>Sunday: 9am - 6pm</li>    </ul>    <p>Please <a href=\"#\" acif-transition=\"redirect\">click here</a> to view our most frequently asked questions.</p></div>";
});
define("Automatons/templates/2056", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <h1 class=\"text-center\">For a full list of our services and prices, please visit <a acif-transition=\"redirect\" href=\"#\">TKH.com</a>.</h1>    <h1 class=\"text-center\">To arrange the addition or removal of one of these, you will need to speak to one of my colleagues on <strong>0344&nbsp;5611234</strong>.</h1></div>";
});
define("Automatons/templates/2057", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. Please can you contact us on <strong>0344&nbsp;5611234</strong> to conduct a review and see how we can support you.</p>    <p>You will need the make, model, order details, and description of the damage. For large box items such as a Washer/Fridge Freezer we may also require the serial number of the product.</p></div>";
});
define("Automatons/templates/2058", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Did you buy your item online or in&#8209;store?</h1>    <div class=\"button-group\">        <button acif-transition=\"online\" class=\"button\" href=\"#\">ONLINE</button>        <button acif-transition=\"instore\" class=\"button\" href=\"#\">IN&#8209;STORE</button>    </div></div>";
});
define("Automatons/templates/2059", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper guide-2\">    <h2>What is your query about?</h2>    <ul>        <li><a acif-transition=\"order_cancellation\" href=\"#\">Order Cancellation</a></li>        <li><a acif-transition=\"change_of_mind\" href=\"#\">Change of mind</a></li>        <li><a acif-transition=\"damaged\" href=\"#\">Damaged</a></li>        <li><a acif-transition=\"faulty\" href=\"#\">Faulty</a></li>        <li><a acif-transition=\"wrong_item\" href=\"#\">Wrong Item</a></li>        <li><a acif-transition=\"anything_else\" href=\"#\">Anything Else</a></li>    </ul></div>";
});
define("Automatons/templates/2060", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper dialog\">    <h1>Did you buy your item online or in&#8209;store?</h1>    <div class=\"button-group\">        <button acif-transition=\"online\" class=\"button\" href=\"#\">ONLINE</button>        <button acif-transition=\"instore\" class=\"button\" href=\"#\">IN&#8209;STORE</button>    </div></div>";
});
define("Automatons/templates/2061", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = "<div class=\"wrapper self-help\">    <p>We need to understand what happened here. Please can you contact us on <strong>0344 5611234</strong> to conduct a review and see how we can support you.</p>    <p>You will need the order details, including make and model of the product and a description of the damage.</p></div>";
});
define("Automatons/templates/formify-map", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {};
});
ACIF.onConfigsReady.resolve();
//# sourceMappingURL=acif-configs.map
