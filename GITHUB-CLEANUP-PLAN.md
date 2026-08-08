# Bazoo Studios GitHub cleanup plan

## Goal

Make the GitHub profile reinforce the portfolio without exposing private work, secrets, local paths, or unfinished experiments.

## First pass

1. Keep and pin `bazoo-studios-website`.
2. Improve its README with the live site link, a short description, technology notes, and safe local-preview instructions.
3. Keep `StreamSpark` private. If it becomes portfolio-ready, create a separate sanitized showcase/demo repository rather than publishing proprietary source code. Remove or generalize any local machine paths from documentation first.
4. Choose one home for the Unity RPG foundation—`SplitscreenAdventure` is the recommended name—and archive the duplicate empty SplitScreen repository.
5. Archive, rather than delete, the two old `my-first-static-web-app` repositories after confirming no Azure deployment still depends on them.

## Showcase repos to create when each project is ready

- Unity 4-Player RPG Framework: `unity-rpg-framework-showcase`
- Bazoo AI Studio: `bazoo-ai-studio-showcase`
- AI NPC TikTok Interaction System: `ai-npc-tiktok-showcase`

These can be case-study or demo repositories. They do not need to expose every asset, private tool, or commercial source file.

## README template for each public project

1. One-sentence elevator pitch.
2. Status: prototype, active development, research, or archived.
3. Your role and contributions.
4. Technology stack.
5. Key features or research questions.
6. Screenshots, trailer, or GIF.
7. Architecture or design notes.
8. Safe demo/setup instructions, if applicable.
9. License, third-party notices, and contact link.

## Profile polish

- Pin the website plus the three strongest showcase projects once available.
- Add accurate topics such as `bazoo-studios`, `game-development`, `unity`, `csharp`, `multiplayer`, `local-ai`, `python`, `uefn`, or `verse` as appropriate.
- Use meaningful commit messages and release notes for real builds.
- Before making any repository public, scan for API keys, tokens, local paths, personal data, licensed assets, and third-party code.
- Keep labels small and useful: `type: bug`, `type: feature`, `type: docs`, `area: gameplay`, `area: ai`, `area: website`, `priority: high`, and `status: blocked`.
