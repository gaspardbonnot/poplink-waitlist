import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const url = window.SUPABASE_URL;
const key = window.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn("Supabase not configured: SUPABASE_URL or SUPABASE_ANON_KEY missing.");
}

const sb = url && key ? createClient(url, key) : null;

const form = document.getElementById("form");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const submit = document.getElementById("submit");
const note = form.querySelector(".note");
const success = document.getElementById("success");
const countEl = document.getElementById("count");

function setNote(text) {
  note.textContent = text;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!sb) {
    setNote("Configuration missing.");
    return;
  }

  const p = prenom.value.trim();
  const m = email.value.trim().toLowerCase();
  if (!p || !m) return;

  submit.disabled = true;
  setNote("Joining...");

  const { error } = await sb.from("waitlist").insert({ prenom: p, email: m });

  if (error) {
    if (error.code === "23505" || /duplicate/i.test(error.message)) {
      form.hidden = true;
      success.textContent = "You're already on the list.";
      success.hidden = false;
    } else {
      submit.disabled = false;
      setNote("Error. Try again.");
      console.error(error);
    }
    return;
  }

  const current = parseInt(countEl.textContent.replace(/[,\s ]/g, ""), 10) || 2347;
  countEl.textContent = (current + 1).toLocaleString("en-US");

  form.hidden = true;
  success.hidden = false;
});
