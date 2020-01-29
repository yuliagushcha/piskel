function showSettings(event) {
  const settings = document.querySelectorAll('.settings');
  const buttons = document.querySelectorAll('.settingButton');
  const parent = event.target.parentNode;

  if (!event.target.classList.contains('activeButton')) {
    buttons.forEach(button => {
      button.classList.remove('activeButton');
    });
    event.target.classList.add('activeButton')
  }

  if(parent.classList.contains('hideSet')) {
    settings.forEach(setting => {
      setting.classList.remove('hideSet');
    });
    if (!parent.classList.contains('showSet')) {
      settings.forEach(setting => {
        setting.classList.remove('showSet');
        setting.lastElementChild.classList.remove('hiddenSettings');
        setting.lastElementChild.classList.add('setting-none');
        parent.classList.add('showSet');
        parent.lastElementChild.classList.remove('setting-none');
        parent.lastElementChild.classList.add('hiddenSettings');
      });
    }
  } else if (!parent.classList.contains('showSet')) {
    settings.forEach(setting => {
      setting.classList.remove('showSet');
      setting.lastElementChild.classList.remove('hiddenSettings');
      setting.lastElementChild.classList.add('setting-none');
      parent.classList.add('showSet');
      parent.lastElementChild.classList.remove('setting-none');
      parent.lastElementChild.classList.add('hiddenSettings');
    });
  } else {
    settings.forEach(setting => {
      setting.classList.add('hideSet');
    });
  }
}

const settingResizeBtn = document.querySelector('.settingsResizeButton');
const settingSaveBtn = document.querySelector('.settingsSaveButton');
const settingImportBtn = document.querySelector('.importButton');

settingResizeBtn.addEventListener('click', showSettings);
settingSaveBtn.addEventListener('click', showSettings);
settingImportBtn.addEventListener('click', showSettings);
