// ==UserScript==
// @name Auto delete github projects
// @namespace https://liamcanetti.co.uk
// @version 1.0.0
// @description Add an auto delete button to GitHub projects to auto fill and submit the delete form for you
// @match https://github.com/*
// @copyright 2023
// ==/UserScript==

const createAutoDeleteButton = () => {
	const button = document.createElement("button");
	button.type = "submit";
	button.classList.add(
		"js-repo-delete-proceed-button",
		"Button--danger",
		"Button--medium",
		"Button",
		"Button--fullWidth"
	);
	button.style.margin = "8px 0 0";
	button.style.textAlign = "center";

	const buttonContent = document.createElement("span");
	buttonContent.classList.add("Button-content");
	buttonContent.textContent = "Auto this repository";
	buttonContent.style.display = "flex";

	button.appendChild(buttonContent);

	return button;
};

const checkForVerificationField = (mutationList, observer) => {
	const verificationField = document.getElementById("verification_field");
	if (!verificationField || hasCreatedAutoDelete) {
		return;
	}

	const repoToDelete = verificationField.dataset.repoNwo;

	const CurrentDeleteButton = document.getElementById(
		"repo-delete-proceed-button"
	);
	const autoDeleteButton = createAutoDeleteButton();
	autoDeleteButton.onclick = () => {
		verificationInput.value = repoToDelete;
	};
	CurrentDeleteButton.parentNode.insertBefore(autoDeleteButton, null);
	hasCreatedAutoDelete = true;
	return;
};

let hasCreatedAutoDelete = false;

const body = document.getElementsByTagName("body")[0];

const observer = new MutationObserver(checkForVerificationField);

observer.observe(body, { attributes: true, childList: true, subtree: true });
