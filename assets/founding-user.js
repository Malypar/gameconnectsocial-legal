(function () {
  "use strict";

  var endpoint = "https://qcrfhakzogfisqmaejfh.supabase.co/functions/v1/founding-user-signup";
  var form = document.getElementById("founding-user-form");
  var email = document.getElementById("founding-email");
  var consent = document.getElementById("founding-consent-checkbox");
  var company = document.getElementById("founding-company");
  var submit = document.getElementById("founding-submit");
  var status = document.getElementById("founding-status");

  if (!form || !email || !consent || !company || !submit || !status) return;

  showRedirectResult();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setBusy(true);
    setStatus("Sending your confirmation email…", "progress");
    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 15000);

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        consent: consent.checked,
        company: company.value
      }),
      signal: controller.signal,
      credentials: "omit",
      referrerPolicy: "strict-origin"
    }).then(function (response) {
      if (!response.ok) throw new Error("request_failed");
      email.value = "";
      consent.checked = false;
      setStatus("Check your inbox to confirm your Founding User request.", "success");
    }).catch(function () {
      setStatus("We couldn’t send the confirmation. Please try again in a moment.", "error");
    }).finally(function () {
      window.clearTimeout(timeout);
      setBusy(false);
    });
  });

  function showRedirectResult() {
    var url = new URL(window.location.href);
    var result = url.searchParams.get("founding");
    if (result === "confirmed") {
      setStatus("You’re confirmed as a GCS Founding User. Watch your inbox for your beta wave.", "success");
    } else if (result === "unsubscribed") {
      setStatus("Your Founding User request was withdrawn and your email was removed.", "success");
    } else if (result === "unavailable") {
      setStatus("That link is expired or unavailable. Submit the form again for a new confirmation.", "error");
    } else {
      return;
    }
    url.searchParams.delete("founding");
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function setBusy(busy) {
    submit.disabled = busy;
    submit.textContent = busy ? "Sending…" : "Become a Founding User";
    form.setAttribute("aria-busy", busy ? "true" : "false");
  }

  function setStatus(message, state) {
    status.textContent = message;
    status.setAttribute("data-state", state);
  }
}());
