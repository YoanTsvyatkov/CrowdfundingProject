// let list = document.getElementById("myList");

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

function loadProjects() {
    // try {
    //     const result = await fetch(``, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });

    //   errorCheck(result);

    //   const projectsList = await result.json();

    // const projectsList = [Project("hah", "hg")]

    // projectsList.forEach((project) => {
    //     createProjectItem(project);
    // });
    // var tag = document.createElement("p");
    // var text = document.createTextNode("Tutorix is the best e-learning platform");
    // tag.appendChild(text);
    // var element = document.getElementById("new");
    // element.appendChild(tag);

    // let data = ['Ram', 'Shyam', 'Sita', 'Gita'];

    // let list = document.getElementById("myList");

    // data.forEach((item) => {
    //     let li = document.createElement("li");
    //     li.innerText = item;
    //     list.appendChild(li);
    // })

    //gggg
    // let data = ['Ram', 'Shyam', 'Sita', 'Gita'];

    // let list = document.getElementsByClassName("grid-container");

    // data.forEach((item) => {
    //     let div = document.createElement("div");
    //     div.innerText = item
    //     // var tag = document.createElement("p");
    //     // var text = document.createTextNode(item)
    //     // tag.appendChild(text)
    //     // div.appendChild(tag)
    //     list.appendChild(div);
    // })

    var testResults = [
        ['Nickname', 'Points', 'Time', 'Difficulty'],
        ['Nickname', 'Points', 'Time', 'Difficulty'],
        ['Nickname', 'Points', 'Time', 'Difficulty'],
        ['Nickname', 'Points', 'Time', 'Difficulty'],
        ['Nickname', 'Points', 'Time', 'Difficulty'],
      ];
      
      var textTable = document.getElementById("text_table");
      var nHTML = '';
      for (var i = 0; i < testResults.length; i++) {
         for(var j=0; j<testResults[i].length; j++){
            nHTML+= testResults[i][j]+ ' ';
         }
         nHTML = '<div>' + nHTML + '</div>';
      }
      textTable.innerHTML = nHTML;
    // } catch (err) {

    // }
}
loadProjects();


function createProjectItem(project) {
    // const project = document.createElement("li");
    // project.className = "draggable";
    // project.setAttribute("draggable", true);

    // /////////////////////HEADER//////////////////////////////
    // const issueHeader = document.createElement("div");
    // issueHeader.className = "issue-header";

    // const issuePriority = document.createElement("option");
    // issuePriority.className = newIssue.priority.toLowerCase();
    // issuePriority.value = newIssue.priority;
    // issuePriority.textContent = newIssue.priority;

    // const closeButton = document.createElement("button");
    // closeButton.className = "close-issue";
    // closeButton.textContent = "\u00D7";

    // closeButton.addEventListener("click", function () {
    //     let issueToBeClosed = getIssue(closeButton);
    //     let statusList = issueToBeClosed.parentElement;
    //     deleteIssue(newIssue._id);
    //     if (issueToBeClosed === editedIssue) {
    //         clearEdit();
    //     }
    //     statusList.removeChild(issueToBeClosed);
    // });

    // const editButton = document.createElement("button");
    // editButton.className = "edit-issue";
    // const editButtonPicture = document.createElement("i");
    // editButtonPicture.className = "fa fa-edit";
    // editButton.appendChild(editButtonPicture);

    // editButton.addEventListener("click", function () {
    //     let issueToBeEdited = getIssue(editButton);
    //     editedIssueId = newIssue._id;
    //     startEditingIssue(issueToBeEdited);
    // });

    // const divButtons = document.createElement("div");
    // divButtons.appendChild(editButton);
    // divButtons.appendChild(closeButton);

    // issueHeader.appendChild(issuePriority);
    // issueHeader.appendChild(divButtons);
    /////////////////////HEADER//////////////////////////////

    //////////////////////BODY///////////////////////////////
    const issueBody = document.createElement("div");
    issueBody.appendChild(document.createTextNode(project.title));
    document.body.appendChild(issueBody);
    var btn = document.createElement("BUTTON");
    document.body.appendChild(btn);
    //////////////////////BODY///////////////////////////////

    /////////////////////FOOTER//////////////////////////////
    // const issueFooter = document.createElement("div");
    // issueFooter.className = "issue-footer";

    // const assigneeSign = document.createElement("div");
    // assigneeSign.appendChild(document.createTextNode("Assignee:"));

    // let assigneeId = "";
    // let firstName = "Unassined";
    // let lastName = "";
    // if (newIssue.assignee) {
    //     assigneeId = newIssue.assignee.id;
    //     firstName = newIssue.assignee.firstName;
    //     lastName = newIssue.assignee.lastName;
    // }

    // const assignTo = document.createElement("option");
    // assignTo.value = assigneeId;
    // assignTo.textContent = `${firstName} ${lastName}`;

    // issueFooter.appendChild(assigneeSign);
    // issueFooter.appendChild(assignTo);
    // /////////////////////FOOTER//////////////////////////////

    // issue.appendChild(issueHeader);
    // issue.appendChild(issueBody);
    // issue.appendChild(issueFooter);

    // //////////////////////DRAG EVENTS////////////////////////
    // issue.addEventListener("dragstart", function () {
    //     draggableIssue = this;
    // });

    // issue.addEventListener("dragend", function () {
    //     const updatedBody = {
    //         status: `${issue.parentElement.id}`,
    //     };

    //     updateIssue(updatedBody, newIssue._id);

    //     draggableIssue = null;
    // });
    // //////////////////////DRAG EVENTS////////////////////////

    // document.getElementById(newIssue.status).appendChild(issue);
}