/**
 * HackersShikkhok — Cyber Terminal Engine & LMS Interaction Controller
 * Brand: HackersShikkhok.com
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initTerminalEngine();
    initScratchpadSync();
    initTtsEngine();
    initLessonNavigation();
  });

  /**
   * Interactive Sandbox Terminal Engine
   */
  function initTerminalEngine() {
    const termBody = document.getElementById('hs-terminal-output');
    const termInput = document.getElementById('hs-terminal-cmd-input');
    const termForm = document.getElementById('hs-terminal-form');
    if (!termBody || !termInput || !termForm) return;

    let history = [];
    let historyIdx = -1;

    // Welcome banner
    appendTerminalLine('SYSTEM INITIALIZED: HackersShikkhok Defensive CTF Terminal v4.0', 'system');
    appendTerminalLine('Type "help" to display sandbox commands, or "exploit sqli" to test mitigation.', 'info');

    termInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0) {
          historyIdx = historyIdx < 0 ? history.length - 1 : Math.max(0, historyIdx - 1);
          termInput.value = history[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (history.length > 0) {
          historyIdx = Math.min(history.length - 1, historyIdx + 1);
          termInput.value = history[historyIdx] || '';
        }
      }
    });

    termForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const rawCmd = termInput.value.trim();
      if (!rawCmd) return;

      history.push(rawCmd);
      historyIdx = -1;
      termInput.value = '';

      appendTerminalLine(`cadet@sandbox:~$ ${rawCmd}`, 'prompt');

      if (rawCmd.toLowerCase() === 'clear') {
        termBody.innerHTML = '';
        return;
      }

      // Check for REST endpoint or run client fallback
      const currentLessonId = termBody.getAttribute('data-lesson-id') || 0;
      
      try {
        const res = await fetch('/wp-json/hackersshikkhok/v1/lms/terminal/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: rawCmd, lesson_id: currentLessonId })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.status === 'clear') {
            termBody.innerHTML = '';
            return;
          }
          appendTerminalLine(data.output, data.status);
          
          // If flag solved, update UI stats if present
          if (data.data && data.data.is_correct && !data.data.already_solved) {
            triggerConfettiNotification(data.data.message);
          }
          return;
        }
      } catch (err) {
        // Fallback to client-side deterministic response
      }

      // Client-side parser fallback
      runClientFallback(rawCmd);
    });

    function appendTerminalLine(text, styleClass) {
      const line = document.createElement('div');
      line.className = 'hs-terminal-line ' + (styleClass || '');
      line.textContent = text;
      termBody.appendChild(line);
      termBody.scrollTop = termBody.scrollHeight;
    }

    function runClientFallback(cmd) {
      const parts = cmd.split(/\s+/);
      const bin = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      if (bin === 'help') {
        appendTerminalLine('Commands: help, scan <ip>, analyze <file>, exploit <vector>, submit-flag <flag>, status, hint, ls, cat <file>, clear', 'info');
      } else if (bin === 'scan') {
        appendTerminalLine(`[+] SCANNING ${arg || '127.0.0.1'}... PORT 80/443 OPEN (TLS 1.3), PORT 3306 FILTERED`, 'success');
      } else if (bin === 'exploit') {
        appendTerminalLine(`[+] Exploit mitigated via PDO Prepared Statements! Flag: HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}`, 'success');
      } else if (bin === 'submit-flag' || bin === 'flag') {
        if (arg.includes('PRePARED_STaTEMENTS_PrOTECT_ALL_2026') || arg.includes('HS{')) {
          appendTerminalLine('🎯 FLAG ACCEPTED! +150 XP & ৳25.00 BDT awarded to wallet.', 'success');
          triggerConfettiNotification('🎯 ফ্ল্যাগ সঠিক! রিওয়ার্ড যুক্ত হয়েছে!');
        } else {
          appendTerminalLine('❌ Invalid flag token. Try again or check the diagram.', 'error');
        }
      } else if (bin === 'status') {
        appendTerminalLine('👤 CADET: Level 1 (Cyber Cadet) | XP: 420 | Wallet: ৳35.50', 'info');
      } else {
        appendTerminalLine(`command not found: ${bin}. Type "help" for options.`, 'error');
      }
    }

    function triggerConfettiNotification(msg) {
      const notif = document.createElement('div');
      notif.style.position = 'fixed';
      notif.style.bottom = '24px';
      notif.style.right = '24px';
      notif.style.background = '#052e16';
      notif.style.border = '1px solid #10b981';
      notif.style.color = '#34d399';
      notif.style.padding = '12px 20px';
      notif.style.borderRadius = '10px';
      notif.style.boxShadow = '0 0 25px rgba(16,185,129,0.3)';
      notif.style.zIndex = '9999';
      notif.textContent = msg;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 5000);
    }
  }

  /**
   * LocalStorage Synced Cadet Scratchpad
   */
  function initScratchpadSync() {
    const pad = document.getElementById('hs-cadet-scratchpad');
    if (!pad) return;

    const saved = localStorage.getItem('hs_cadet_notes_v4');
    if (saved) pad.value = saved;

    pad.addEventListener('input', function () {
      localStorage.setItem('hs_cadet_notes_v4', pad.value);
    });
  }

  /**
   * Text-To-Speech (TTS) Voice Engine
   */
  function initTtsEngine() {
    const ttsBtn = document.getElementById('hs-tts-play-btn');
    const voiceSelect = document.getElementById('hs-tts-voice-select');
    if (!ttsBtn) return;

    let isPlaying = false;

    ttsBtn.addEventListener('click', function () {
      if (!('speechSynthesis' in window)) {
        alert('আপনার ব্রাউজার Text-to-Speech সাপোর্ট করে না।');
        return;
      }

      if (isPlaying) {
        window.speechSynthesis.cancel();
        isPlaying = false;
        ttsBtn.textContent = '🔊 লেকচার শুনুন (TTS)';
        return;
      }

      const bodyText = document.querySelector('.hs-lesson-body');
      if (!bodyText) return;

      const utterance = new SpeechSynthesisUtterance(bodyText.innerText);
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const selectedGender = voiceSelect ? voiceSelect.value : 'female';
      
      const chosenVoice = voices.find(v => 
        selectedGender === 'female' 
          ? (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google UK English Female'))
          : (v.name.includes('Male') || v.name.includes('Daniel') || v.name.includes('Google UK English Male'))
      );

      if (chosenVoice) utterance.voice = chosenVoice;

      utterance.onend = function () {
        isPlaying = false;
        ttsBtn.textContent = '🔊 লেকচার শুনুন (TTS)';
      };

      isPlaying = true;
      ttsBtn.textContent = '⏹️ প্লে থামান (Stop)';
      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Lesson Navigation & Progress Auto-Trigger
   */
  function initLessonNavigation() {
    const completeBtn = document.getElementById('hs-mark-complete-btn');
    if (!completeBtn) return;

    completeBtn.addEventListener('click', async function () {
      const lessonId = completeBtn.getAttribute('data-lesson-id');
      if (!lessonId) return;

      completeBtn.disabled = true;
      completeBtn.textContent = '⏳ প্রসেসিং...';

      try {
        const res = await fetch('/wp-json/hackersshikkhok/v1/lms/progress/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lesson_id: lessonId })
        });
        const data = await res.json();
        if (data.success) {
          completeBtn.textContent = '✅ লেসন সম্পন্ন হয়েছে (+XP)';
          completeBtn.style.background = '#10b981';
          completeBtn.style.color = '#050811';
        }
      } catch (e) {
        completeBtn.textContent = '✅ সম্পন্ন চিহ্নিত (লোকাল)';
      }
    });
  }
})();
