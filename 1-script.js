(function () {
  // 1. Interactive Week-One Reset Checklist
  var items = document.querySelectorAll('#protocol-list li');
  var detail = document.getElementById('protocol-detail-text');
  items.forEach(function (li) {
    li.addEventListener('click', function () {
      items.forEach(function (el) {
        el.classList.remove('active');
      });
      li.classList.add('active');
      li.classList.toggle('done');
      var text = li.getAttribute('data-detail');
      if (text && detail) {
        detail.textContent = text;
      }
    });
  });

  // 2. Interactive AI Logistics Simulator
  var flows = {
    school: {
      inLabel: 'Raw Input (Forwarded Email / PDF)',
      inText:
        'Forwarded 4-page school newsletter PDF + coach message:\n"Saturday game moved to 9:30am at Magnuson Field 4, wear white kit. Friday is early dismissal at 12:15pm."',
      outLabel: 'Automated AI Action',
      outText:
        '✓ Friday 12:15 PM: Pickup updated on Master Calendar\n✓ Friday 8:00 PM: Reminder set to lay out white kit & hydration\n✓ Saturday 8:45 AM: Departure alert + Field 4 map link sent automatically'
    },
    brief: {
      inLabel: '6:55 AM System Trigger (Calendar + Weather + Nutrition Plan)',
      inText:
        'Sources synced: Master Family Calendar, Forecast (52°F, Rain), Weekly Nutrition Plan, Daily Schedule.',
      outLabel: '7:00 AM WhatsApp Morning Brief',
      outText:
        '✓ "Good morning! Rain today—pack rain shells in school bags.\n✓ 3:30 PM: Leo swim training (gear bag in mudroom).\n✓ 5:00 PM: Dinner prep—salmon & rice (recipe link attached).\n✓ 6:30 PM: Evening handoff."'
    }
  };

  var tabs = document.querySelectorAll('.ai-tab');
  var inLabel = document.getElementById('ai-in-label');
  var inText = document.getElementById('ai-in-text');
  var outLabel = document.getElementById('ai-out-label');
  var outText = document.getElementById('ai-out-text');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      var key = tab.getAttribute('data-Flow');
      var data = flows[key];
      if (data && inLabel && inText && outLabel && outText) {
        inLabel.textContent = data.inLabel;
        inText.textContent = data.inText;
        outLabel.textContent = data.outLabel;
        outText.textContent = data.outText;
      }
    });
  });

  // Pre-select focus when clicking schedule link
  var focusLinks = document.querySelectorAll('[data-select-focus]');
  var focusSelect = document.getElementById('c-focus');
  focusLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var val = link.getAttribute('data-select-focus');
      if (focusSelect && val) {
        focusSelect.value = val;
      }
    });
  });

  // 3. Schedule a Detailed Consult Call Form -> real POST to FormSubmit (pepcc1500@gmail.com)
  var consultForm = document.getElementById('consult-form');
  var statusEl = document.getElementById('form-status');
  var submitBtn = document.getElementById('consult-submit');

  if (consultForm) {
    consultForm.addEventListener('submit', function () {
      // Personalize the email subject, then let the browser do a native POST
      // to https://formsubmit.co/pepcc1500@gmail.com (see the form action).
      var name = (document.getElementById('c-name').value || '').trim();
      var city = (document.getElementById('c-city').value || '').trim();
      var subjectInput = consultForm.querySelector('input[name="_subject"]');
      if (subjectInput && name) {
        subjectInput.value =
          'New 30-Minute Consult Call Request \u00b7 ' + name + (city ? ' (' + city + ')' : '');
      }
      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) statusEl.textContent = 'Sending request to Pep...';
      // No preventDefault: the native form POST is the real submission.
      // FormSubmit redirects back to the site with ?sent=1 (see _next).
    });

    // Confirmation after FormSubmit redirects back with ?sent=1
    if (window.location.search.indexOf('sent=1') !== -1) {
      if (statusEl) {
        statusEl.textContent = '\u2713 Request sent. Pep will reply shortly.';
      }
      consultForm.reset();
      if (submitBtn) submitBtn.disabled = false;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.hash);
      }
    }
  }
})();
