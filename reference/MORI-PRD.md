# MORI Product Requirements Document

**Project Type:** Independent Concept Project
**Year:** 2026
**Platform:** Mobile App + Responsive Marketing Website
**Language:** English
**Portfolio Scope:** Product Strategy, UX/UI Design, Brand Direction, Frontend
**Status:** Concept / Portfolio Case Study

---

# 1. Product Overview

## 1.1 Product Name

**MORI**

## 1.2 One-line Description

**A quieter way to understand how you feel and decide what to do next.**

## 1.3 Product Concept

MORI is a conceptual mental wellness companion designed for moments when someone's mind feels like too much.

Instead of presenting users with a large library of meditation sessions, articles, journal prompts, statistics, wellness tools, or chatbot interactions, MORI helps them answer a simpler question:

> **What can I do right now?**

MORI guides the user through a short emotional check-in, understands a small amount of context, and recommends one manageable next step.

The product is intentionally not positioned as therapy, diagnosis, emergency care, or an AI psychologist.

Its purpose is simpler:

**Help users move from emotional uncertainty toward one small, manageable action.**

---

# 2. The Problem

People experiencing stress, overthinking, emotional exhaustion, or overwhelm often do not know exactly what they are feeling or what would help.

Many wellness products can inadvertently increase cognitive load by presenting users with:

* Content libraries
* Multiple exercises
* Meditation categories
* Mood dashboards
* Journaling systems
* Courses
* Recommendations
* Goals
* Gamification
* Chatbots
* Statistics

The user therefore has to make another decision at exactly the moment when decision-making already feels difficult.

## 2.1 Core Problem

> **People feel overwhelmed, stressed, or stuck in their thoughts, but struggle to understand what they're feeling and don't know what small action to take next.**

MORI is designed around reducing that decision burden.

---

# 3. Product Vision

MORI should become the shortest possible path between:

> **"Something doesn't feel right."**

and:

> **"I know what I can do right now."**

MORI does not try to solve someone's life.

It helps make the next few minutes feel more manageable.

---

# 4. Primary Value Proposition

> **When everything feels like too much, MORI helps you figure out what to do next.**

The intended emotional journey is:

**Calm -> Understood -> Direction -> Small Action**

The user should leave MORI thinking:

> **"Things feel a little more manageable now."**

---

# 5. Product Principles

## 5.1 Less Thinking, More Grounding

Every interaction should reduce cognitive load rather than introduce additional decisions.

When possible:

**Recommend instead of browse.**

**Recognize instead of explain.**

**One action instead of ten options.**

## 5.2 One Thing at a Time

Every primary screen should have one clear purpose.

Avoid competing CTAs, dense navigation, dashboards, and unnecessary information.

## 5.3 You Don't Have to Explain Yourself

Users should never be required to describe their emotional state through long-form text.

Questions should primarily use recognition-based choices.

Users can always choose:

**I'm not sure**

**Rather not say**

or:

**Skip**

## 5.4 No Pressure to Return

MORI should not manufacture engagement through guilt.

No:

* Streak pressure
* XP
* Leaderboards
* Daily punishment
* Achievement systems
* Manipulative notifications

The product philosophy is:

> **You're here when you need it.**

MORI's success is not measured by how long users remain inside the product.

> **MORI isn't designed to keep you here.**

## 5.5 Support, Not Diagnosis

MORI must never claim to:

* Diagnose mental health conditions
* Replace professional therapy
* Determine the cause of an emotion
* Provide emergency clinical treatment
* Act as an AI therapist

Its language should remain supportive and probabilistic rather than clinical.

---

# 6. Target Audience

## 6.1 Primary Audience

Young adults approximately **18 to 35 years old**, especially:

* University students
* Young professionals
* Freelancers
* Creative workers
* People with digitally intensive lifestyles

MORI is designed primarily around everyday emotional states such as:

* Overwhelmed
* Restless
* Mentally tired
* Low
* Lonely
* Frustrated
* Unfocused
* Disconnected
* Overthinking
* Unsure how they feel

MORI remains accessible to a broader adult audience, but the product should not attempt to design for everyone equally.

---

# 7. Jobs to Be Done

## 7.1 Primary Job

> **When my mind feels overwhelmed and I don't know what to do, help me understand what I'm experiencing and give me one manageable action so I can feel more grounded.**

## 7.2 Supporting Jobs

When I do not know how to describe what I am feeling, help me recognize it without requiring a long explanation.

When I need something practical, guide me through it instead of making me search through a content library.

When I have used MORI repeatedly, help me notice useful patterns without making me interpret complicated analytics.

When a quick wellness exercise is not enough, help me understand that seeking human or professional support may be appropriate.

---

# 8. Core Experience

The primary product structure is:

**Feel -> Understand -> Act -> Reflect -> Patterns**

For the portfolio prototype, the core flow is:

**Mood Check-in -> Context -> MORI Response -> One Small Step -> Guided Activity -> Reflection -> Done**

Patterns exists as a secondary returning-user experience.

The core flow should prioritize recognition-based input, minimal decision-making, and one visually dominant action per state.

---

# 9. Core Mobile Experience

## 9.1 Check-in

Primary prompt:

> **How are you, really?**

Example responses:

* Overwhelmed
* Low
* Restless
* Okay
* Good
* I'm not sure

No dashboard should precede this interaction.

Opening MORI should lead directly toward checking in.

## 9.2 Understand

If the user selects:

**Overwhelmed**

MORI may ask:

> **What feels closest right now?**

Options:

* Too much to do
* Can't stop thinking
* Something happened
* Emotionally drained
* I don't know

The interaction relies on recognition rather than requiring the user to formulate an explanation.

## 9.3 Context

MORI asks no more than one or two lightweight contextual questions.

Example:

> **Where is your mind stuck?**

Possible responses:

* Work / Study
* Relationship
* Future
* Something I did
* Everything
* Rather not say

Secondary action:

**Skip**

Context gathering must remain intentionally limited.

The goal is routing, not psychological assessment.

A recommendation should be reachable after no more than three lightweight user decisions.

## 9.4 MORI Response

This is the central emotional moment of the experience.

Example:

> **Your mind has been holding onto a lot.**
>
> We don't have to untangle it all right now.
>
> Let's give it somewhere to rest for two minutes.

Primary CTA:

**Start 2-minute reset**

Secondary action:

**Choose something else**

Only one recommendation receives visual priority.

MORI should not display a recommendation carousel or content library.

---

# 10. Recommendation Routing

For the concept prototype, routing is deterministic and transparent.

MORI is not an AI therapist.

Conceptual logic:

**Input -> Context -> Route -> One Small Step**

Example routing:

| Mood         | Context             | One Small Step            |
| ------------ | ------------------- | ------------------------- |
| Overwhelmed  | Can't stop thinking | Grounding                 |
| Overwhelmed  | Too much to do      | Tiny prioritization reset |
| Restless     | Body tension        | Breathing                 |
| Low          | Low energy          | Tiny physical action      |
| Lonely       | Relationship        | Connection prompt         |
| Frustrated   | Something happened  | Release exercise          |
| Confused     | Unclear             | Guided reflection         |
| Good         | General             | Positive reflection       |
| I'm not sure | Unknown             | Body awareness            |

The routing model should remain understandable enough for a designer, developer, or reviewer to follow without assuming hidden clinical intelligence.

MORI should say:

> **Try this.**

rather than:

> **Choose an exercise.**

Routing logic must remain separate from visual animation logic in implementation.

---

# 11. Guided Activity

A selected activity should temporarily remove unnecessary interface elements.

For a grounding experience, an example sequence is:

> **Put both feet on the floor.**

Pause.

> **Look around.**

Pause.

> **Find three things that are completely still.**

Pause.

> **Listen closely. Notice one sound you weren't paying attention to before.**

Completion:

> **Nothing needs fixing right now.**

## 11.1 UI Requirements

During an activity:

* Hide unnecessary navigation
* Present one instruction at a time
* Use generous whitespace
* Use gentle motion where appropriate
* Show no statistics
* Show no progress gamification
* Use minimal controls
* Provide an easy exit
* Do not require an account

## 11.2 Companion During Grounding

At entry, the companion slowly sits or settles.

For:

**Put both feet on the floor.**

The companion places or settles its feet firmly.

For:

**Look around.**

The companion turns its body slightly.

For:

**Listen closely.**

The companion becomes almost completely still.

For:

**Nothing needs fixing right now.**

Its arms relax. Its body settles. One subtle blink may occur. It then becomes still.

Breathing may synchronize subtly with the grounding rhythm.

The companion must never perform the exercise theatrically. Its purpose is to provide presence, not entertainment.

---

# 12. Reflection

After an activity, MORI asks:

> **How does it feel now?**

Responses:

**A little lighter**

**About the same**

**A little heavier**

Avoid numerical emotional scoring unless future research establishes a need.

## 12.1 A Little Lighter

MORI:

> **Good.**
>
> You don't have to do anything else.

CTA:

**Finish**

The companion relaxes and stands slightly taller.

## 12.2 About the Same

MORI:

> **That's okay.**
>
> Would you like another small step?

Actions:

**One more step**

**I'm done for now**

The companion remains neutral.

## 12.3 A Little Heavier

MORI should avoid generic motivational messaging.

Example:

> **It sounds like this might need more than a quick reset.**

The companion may sit nearby or move slightly closer.

It must never cry, appear disappointed, or imply that the user failed.

Potential next actions:

**Talk to someone you trust**

**Find professional support**

---

# 13. Patterns

Patterns become available after sufficient check-in history exists.

Header:

> **Things MORI has noticed with you.**

Examples:

> **Late evenings seem heavier.**
>
> You checked in feeling overwhelmed on 4 of your last 6 late evenings.

Or:

> **Work has been showing up often.**
>
> Work appeared in 5 recent check-ins.

Or:

> **Grounding seems useful for you.**
>
> You felt a little lighter after grounding 4 out of 5 times.

Use cautious terms such as:

* Seems
* Appeared
* May
* Often

Avoid language such as:

* Causes
* Proves
* Diagnosis
* Condition

MORI identifies patterns, not medical conclusions.

The companion should normally be absent from Patterns so the information remains quiet and focused.

---

# 14. Information Architecture

Primary mobile navigation should remain extremely small.

## Today

Primary check-in experience.

## Patterns

Historical observations and lightweight insights.

## Settings

Secondary access for:

* Privacy
* Data
* Activity preferences
* Reminders
* Support resources
* Account settings

Avoid persistent navigation to large content libraries.

---

# 15. Journaling

Journaling is contextual rather than a primary product destination.

Example:

> **Get it out of your head.**

CTA:

**2-minute brain dump**

Instruction:

> **Write without fixing anything.**

The interface should contain:

* Simple text field
* No tags
* No folders
* No rich formatting
* No productivity system

The goal is emotional release, not document management.

Free-form writing is optional and must never be required to complete the core flow.

---

# 16. Ambient Companion

The MORI companion is a subtle non-human character that gives the experience a quiet sense of presence.

Its purpose is to provide emotional warmth and recognizability without turning MORI into a virtual pet application.

Core principle:

> **Mostly still. Occasionally alive.**

## 16.1 Visual Form

The companion should use:

* Organic pebble or seed shaped body
* Slightly asymmetrical handmade silhouette
* Matte clay, paper, stone, or ceramic feeling
* Two tiny eyes
* Two small arms
* Two short legs
* No mouth required
* No clothing
* No accessories
* No animal ears
* No large cartoon eyes
* No glossy toy aesthetic

## 16.2 Character Personality

The companion should feel:

* Quiet
* Gentle
* Curious
* Slightly shy
* Grounded
* Non-demanding
* Appropriate for an adult wellness product

## 16.3 What the Companion Is Not

The companion must not become:

* A virtual pet
* A reward system
* A gamification mechanic
* A retention mechanic
* A source of guilt
* Something the user must care for

Explicitly out of scope:

* Feeding
* Hunger
* XP
* Levels
* Coins
* Streaks
* Pet missions
* Outfits
* Inventory
* Pet customization
* Evolution systems
* Daily care requirements

## 16.4 Companion Presence

Primary appearances:

* Hero
* Interactive Check-in
* Grounding
* Reflection
* Final CTA

The companion should normally not appear:

* In navigation
* In Patterns
* In Privacy
* Beside every CTA
* In the footer
* In every product state

Absence is part of the character design.

The visitor should occasionally rediscover the companion rather than see it continuously.

---

# 17. Companion States

Implementation may use a state machine or equivalent interaction model.

Minimum conceptual states:

```text
idle
walkIn
wave
notice
overwhelmed
low
restless
neutral
good
sit
breathe
settle
goodbye
```

## 17.1 Hero

Sequence:

1. Companion walks two or three small steps into view.
2. Stops.
3. Looks toward the visitor.
4. Waits briefly.
5. Waves slowly once or twice.
6. Returns to idle.

The greeting must not loop continuously.

## 17.2 Emotional States

**Overwhelmed**

Slightly lower posture. Arms move closer to the body. Feet feel more grounded.

**Low**

Lower energy posture with minimal motion. The companion may sit or settle.

**Restless**

Very small weight shift between feet.

**Okay**

Neutral grounded pose.

**Good**

Slightly taller relaxed stance with a more open posture. No celebration.

**I'm not sure**

Small body tilt. One foot subtly forward. Curious but neutral posture.

## 17.3 Reflection States

**A little lighter**

Companion relaxes and stands slightly taller.

**About the same**

Companion remains neutral.

**A little heavier**

Companion may sit nearby or move slightly closer.

It must never cry, look disappointed, or imply failure.

## 17.4 Final CTA

The companion may give one small goodbye wave.

The goodbye animation plays once and does not loop.

---

# 18. Companion Motion Principles

The companion should communicate primarily through posture rather than facial expression.

Approximate behavior balance:

**80 percent resting or nearly still**

**20 percent subtle movement**

Rules:

* Mostly still
* Occasionally alive
* No constant movement
* No bouncing
* No spring physics
* No elastic movement
* No exaggerated squash and stretch
* No rapid blinking
* No constant waving
* No continuous walking
* No cursor chasing

Suitable movement includes:

* Slow breathing
* Rare blinking
* Tiny weight shifts
* Gentle body tilt
* Small arm movements
* Short walking sequences
* Calm sitting and settling animations

---

# 19. Companion Accessibility

When `prefers-reduced-motion` is enabled:

* Disable walking
* Disable repeated breathing animation
* Disable ambient idle animation
* Disable automatic waving
* Disable image drift associated with the companion
* Show the companion directly in a calm resting pose

No essential information may depend on companion animation.

The product and marketing experience must remain fully understandable without the companion.

---

# 20. Safety and Human Support

MORI is a wellness concept, not a medical product.

The interface and marketing should clearly avoid claims of diagnosis or treatment.

When user feedback suggests that a lightweight activity was insufficient, MORI can appropriately introduce human support.

Marketing language may include:

> **Sometimes you need more than an app.**

## 20.1 Support Prototype

If a user indicates that an activity made them feel heavier, MORI may surface:

**Talk to someone you trust**

**Find professional support**

Professional support should open a calm informational panel rather than a fake clinical service.

Example:

> **Need more support?**
>
> MORI is not therapy or emergency care.
>
> **Professional support**
>
> Find an appropriate licensed mental health professional in your area.
>
> **Immediate danger**
>
> If you feel unsafe or are in immediate danger, contact appropriate local emergency services.

The concept prototype must not:

* Diagnose crisis severity
* Pretend to provide emergency intervention
* Automatically contact another person
* Automatically contact emergency services
* Claim that MORI can determine clinical risk

For a real production launch, regional crisis resources, safeguarding, professional review, regulatory requirements, and clinical risk handling require dedicated validation beyond this concept.

---

# 21. Privacy Principles

Emotional information should be treated as highly sensitive.

Brand principle:

> **Your feelings aren't ad targeting data.**

Conceptual privacy positioning:

* No advertising based on emotional data
* No sale of emotional data
* Delete history
* Export history
* Optional reminders
* App lock
* Transparent data controls

Any such claims in a production product must correspond to actual technical implementation and policy.

The companion should normally be absent from privacy communication. Trust should come from clear language and product behavior rather than character reassurance.

---

# 22. Feature Prioritization

## P0: Design in Portfolio

* Emotional check-in
* Lightweight context
* One Small Step recommendation
* Grounding
* Breathing
* Short guided reflection
* Post-activity reflection
* Patterns
* Privacy concept
* Find Support / safety flow
* Ambient companion core states

## P1: Demonstrate Lightly

* Personal activity preferences
* History
* Data export
* App lock
* Optional reminders

## P2: Explicitly Out of Scope

* Social feed
* Community
* AI therapist
* Public profiles
* Gamification
* Leaderboards
* XP
* Streak pressure
* Large content library
* Diagnosis
* Personality tests
* Companion feeding
* Companion customization
* Virtual pet progression
* Daily care mechanics

---

# 23. Visual Direction

Design statement:

> **MORI should feel like a quiet room in digital form.**

Direction:

**Warm Human x Quiet Premium x Editorial Restraint**

MORI should feel:

* Calm
* Intimate
* Thoughtful
* Warm
* Quiet
* Mature

MORI should not feel:

* Clinical
* Futuristic
* Playful
* Cute
* Overly luxurious
* Corporate SaaS
* Generic pastel wellness

Core visual principle:

> **Less interface. More breathing room.**

---

# 24. Visual Design Tokens

Suggested implementation tokens:

| Token           | Value     |
| --------------- | --------- |
| Surface         | `#FFF8F6` |
| Surface Warm    | `#FBF4F0` |
| Surface Tint    | `#FFF1EB` |
| Espresso        | `#261E1B` |
| Espresso Soft   | `#3D312C` |
| Earth           | `#54433E` |
| Earth Light     | `#86736D` |
| Terracotta      | `#A45B45` |
| Terracotta Dark | `#86442F` |
| Terracotta Soft | `#FAEBE4` |
| Sage            | `#4A5D4C` |
| Sage Soft       | `#D8E2D9` |
| Sage Tint       | `#E9EFE9` |
| Hairline        | `#E6D7D1` |
| Ground Night    | `#181210` |
| Ground Surface  | `#201815` |

Implementation may adjust individual values slightly to satisfy accessibility and contrast requirements.

The overall tonal relationship should remain intact.

Warm surfaces should dominate. Espresso provides primary text contrast. Terracotta provides restrained warmth. Sage communicates calm interactive selection states. Dark ground colors may support immersive grounding moments.

---

# 25. Typography

## Marketing Display

**Newsreader**

Suggested fallback:

```css
font-family: "Newsreader", Georgia, "Times New Roman", serif;
```

## UI and Body

**Plus Jakarta Sans**

Suggested fallback:

```css
font-family: "Plus Jakarta Sans", Inter, Arial, sans-serif;
```

## Typography Principles

* Use editorial serif typography for emotional statements and major marketing headlines
* Use humanist sans typography for product UI and body copy
* Maintain comfortable line height
* Do not use artificially tiny body text for aesthetic reasons
* Use strong responsive scaling
* Maintain clear hierarchy
* Allow large editorial typography on desktop
* Preserve highly readable mobile typography

---

# 26. Product Interaction Style

MORI mobile UI should prefer:

* Quiet row-based selections
* Hairline separators
* Subtle selected states
* Muted sage selection backgrounds
* Minimal borders
* Few card containers
* Large touch targets
* One primary action per state
* Recognition-based choices

Avoid excessive use of:

* Pills
* Rounded cards
* Floating containers
* Chips
* Badges
* Dashboard components

Pills should only be used when semantically appropriate.

Selection states must never rely on color alone. Use combinations of text treatment, icons, indicators, borders, or other accessible signals.

---

# 27. Photography Direction

Photography should support emotional pacing rather than act as decoration.

Use approximately three major photographic moments across the marketing website.

## 27.1 Hero

Possible subjects:

* Quiet interior
* Window light
* Empty chair
* Curtain
* Soft domestic stillness

## 27.2 Visual Pause

Possible subjects:

* Light across linen
* Wall shadows
* Floor light
* Fogged glass
* Quiet room detail

## 27.3 Privacy

Possible subjects:

* Tactile still life
* Handmade paper
* Closed notebook
* Natural materials
* Subtle domestic object

## 27.4 Photography Characteristics

Photography should use:

* Natural window light
* Warm neutral temperature
* Low saturation
* Soft contrast
* Slight grain
* Editorial framing
* Slight imperfection
* Quiet atmosphere
* Implied human presence where appropriate without requiring a staged person

Avoid:

* Meditation stock photography
* People holding their head
* Smiling wellness models
* Lotus imagery
* Generic mountains
* Generic forest wellness imagery
* Corporate lifestyle photography
* Highly polished commercial stock photography

All photography should feel like part of the same editorial campaign.

---

# 28. Motion System

Motion should communicate calm, continuity, and presence.

It must not become a spectacle.

## 28.1 Hero Typography

* Soft reveal
* Maximum movement of approximately 12 to 18px
* Duration approximately 600 to 900ms

## 28.2 Photography

Where appropriate:

* Slow drift
* Approximately 14 to 22 second ambient cycle

## 28.3 Image Entrance

* Subtle clipping or mask reveal
* Approximately 900 to 1400ms

## 28.4 Hairline Elements

* Gentle left to right draw
* Approximately 700 to 1200ms

## 28.5 Product State Transitions

* Approximately 400 to 650ms
* Soft opacity
* Small vertical movement

## 28.6 Patterns

Data dots may appear sequentially.

Animation should not imply greater analytical certainty than the underlying conceptual data supports.

## 28.7 Companion

* Slow gestures
* Long idle periods
* State-based posture
* Rare movement

## 28.8 Avoid

* Generic fade-up animation on every element
* Scroll hijacking
* Marquees
* Cursor trails
* Particles
* Spring movement
* Elastic easing
* Large hover scaling
* Decorative motion without purpose

All non-essential motion must respect reduced-motion preferences.

---

# 29. Marketing Website Goal

The website should not function as a traditional feature catalogue.

Its purpose is to let visitors experience the philosophy of MORI while learning about the product.

The website should feel closer to an interactive product story than a SaaS template.

Static screenshots should not repeatedly demonstrate nearly identical product states.

Instead, the visitor should progressively experience the core product logic.

---

# 30. Marketing Website Architecture

The required structure is:

1. Hero
2. Interactive Check-in
3. Less Thinking Manifesto
4. Visual Pause
5. One Small Step
6. Interactive Grounding
7. Reflection
8. Patterns
9. Privacy
10. Human Support
11. Final CTA

## 30.1 Hero

Eyebrow:

**A quieter mental wellness companion**

Headline:

> **Too much on your mind?**

Supporting copy:

> **MORI helps you understand what you're feeling and find one small thing to do next.**

Primary CTA:

**Check in with yourself**

The companion walks two or three small steps into view, stops, notices the visitor, waits, gives a slow greeting wave once or twice, then returns to idle.

The greeting does not loop.

Photography may introduce the quiet interior visual direction.

## 30.2 Interactive Check-in

This section combines Check-in, Understand, and Context into one interactive product story.

The visitor experiences:

> **How are you, really?**

then:

> **What feels closest right now?**

then:

> **Where is your mind stuck?**

then reaches:

**One Small Step**

The interaction should work rather than behave as a static screenshot.

The companion may subtly respond to mood selection through posture.

## 30.3 Less Thinking Manifesto

This section explains the central product insight.

Core message:

> **People don't always need more options. Sometimes they need fewer decisions.**

Supporting principle:

> **Less thinking. More grounding.**

The section should use strong editorial typography and minimal interface imagery.

## 30.4 Visual Pause

A deliberate reduction in information density.

Use one major photographic moment such as:

* Light across linen
* Wall shadows
* Floor light
* Fogged glass
* Quiet room detail

The section exists to create pacing, not to introduce another feature.

## 30.5 One Small Step

Headline:

> **One thing. Not ten.**

Demonstrate how MORI converts emotional input and lightweight context into one recommendation.

MORI should say:

> **Try this.**

The user should not be presented with a recommendation library.

## 30.6 Interactive Grounding

Temporarily transform the marketing website into a small grounding experience.

Example progression:

> **Put both feet on the floor.**

then:

> **Look around.**

then:

> **Listen closely.**

then:

> **Nothing needs fixing right now.**

The companion participates only through subtle posture and settling behavior.

The interaction must remain understandable without animation.

## 30.7 Reflection

Suggested headline:

> **A little lighter?**

Options:

**A little lighter**

**About the same**

**A little heavier**

Example lighter response:

> **Good.**
>
> You don't have to do anything else.

Product philosophy:

> **MORI isn't designed to keep you here.**

Supporting message:

> **No streaks.**
>
> **No endless feed.**
>
> **No pressure to come back.**
>
> **You're here when you need it.**

This section should contain generous whitespace and minimal visual activity.

## 30.8 Patterns

Headline:

> **Small moments become patterns.**

Introduce MORI's lightweight personal insights.

Avoid conventional analytics dashboard visuals.

Patterns should feel like thoughtful observations rather than performance metrics.

The companion should normally be absent.

## 30.9 Privacy

Headline:

> **Your feelings are yours.**

Supporting statement:

> **Your feelings aren't ad targeting data.**

Use a tactile photographic moment and restrained editorial presentation rather than a generic feature grid.

## 30.10 Human Support

Headline:

> **Sometimes you need more than an app.**

Explain clearly that MORI is not therapy, diagnosis, or emergency care.

A functional prototype can demonstrate the calm support information panel defined in the safety requirements.

## 30.11 Final CTA

Headline:

> **You don't need to figure everything out today.**

Supporting line:

> **Start with now.**

CTA:

**Begin with MORI**

The companion may appear again and give one small goodbye wave.

The animation plays once.

---

# 31. MORI Content Style

Language should be:

* Simple
* Warm
* Calm
* Direct
* Non-judgmental
* Non-clinical
* Short
* Human

Prefer language such as:

> **You don't have to figure everything out right now.**

> **Try this.**

> **Start where you are.**

> **Nothing needs fixing right now.**

Avoid unnecessarily academic language such as:

* Resonance
* Architecture
* Calibrated
* Cognitive tax
* Longitudinal
* Somatic outcome
* High affinity

Technical terminology can exist inside internal implementation documentation where necessary, but it should not leak into user-facing MORI copy.

Avoid unsupported clinical sounding claims.

MORI should not claim that an activity:

* Regulates the nervous system
* Treats anxiety
* Reduces a clinical condition
* Produces medical recovery

Such claims require appropriate evidence and validation in any future production context.

---

# 32. Responsive and Accessibility Requirements

The marketing website must support:

* Desktop
* Tablet
* Mobile

The experience should preserve editorial pacing across breakpoints rather than simply stacking every desktop composition.

Interactive elements must remain touch-friendly.

Typography should scale responsively without compromising readability.

Minimum accessibility requirements:

* WCAG-conscious contrast
* Keyboard-accessible interactions
* Visible focus states
* Semantic page hierarchy
* Appropriate form labels
* Large touch targets
* Reduced-motion support
* No emotional state communicated through color alone
* Clear and simple language
* Screen-reader-conscious interactive experiences

Accessibility is particularly important because users may interact with MORI while stressed or cognitively overloaded.

---

# 33. Interactive Prototype Requirements

The prototype must demonstrate functional interaction rather than only polished visual screens.

Required behavior:

* Mood selection works
* Understand selection works
* Context selection works
* User can skip contextual questions
* MORI recommendation changes according to routing state
* Grounding sequence can be advanced
* Reflection choices change MORI response
* Companion reacts subtly to state
* Support panel can be opened
* Navigation links work
* No important dead links
* Reduced motion is supported
* Keyboard interaction is supported where applicable
* Selection does not rely only on color

The prototype should allow a reviewer to experience the primary MORI value proposition without needing explanatory narration.

---

# 34. Prototype Acceptance Criteria

The prototype is acceptable when:

* A recommendation is reached after no more than three lightweight user decisions
* No core flow requires free-form typing
* Context questions can be skipped
* Each primary state has only one visually dominant CTA
* No screen presents multiple primary recommendations
* Grounding can be completed without creating an account
* Reflection supports lighter, same, and heavier outcomes
* Heavier outcomes can surface human support
* The user can exit an activity easily
* Reduced motion preserves all functionality
* Keyboard navigation remains possible
* Selected states are communicated through more than color alone
* Important actions contain no dead links
* The prototype contains no fake testimonials
* The prototype contains no fake user metrics
* The prototype contains no fabricated health outcomes
* No gamification is present
* No streak mechanics are present
* No AI therapist framing is present

---

# 35. Frontend Implementation Guidance

This section provides implementation guidance rather than prescribing a fixed technology stack.

The implementation should separate the following concerns:

1. Marketing UI
2. Product prototype UI
3. Companion state logic
4. Recommendation routing
5. Motion system
6. Accessibility preferences

## 35.1 Companion Implementation

Preferred approach:

**Rive state machine**

Alternative:

**SVG with Framer Motion or GSAP**

Avoid GIF-based character animation for primary interaction because the companion needs responsive states.

Suggested state structure:

```text
idle
walkIn
wave
notice
overwhelmed
low
restless
neutral
good
sit
breathe
settle
goodbye
```

The companion state layer should respond to product state rather than control it.

Product routing logic must remain separate from visual animation logic.

For example:

```text
User Input
    |
    v
Routing Logic
    |
    v
Product State
    |
    +--> UI State
    |
    +--> Companion State
```

This prevents animation behavior from becoming coupled to recommendation logic.

## 35.2 Recommendation Implementation

For the concept prototype, use deterministic routing rather than opaque model-generated decisions.

A simple rules object, lookup table, or finite decision tree is sufficient.

The implementation should make it easy to inspect:

**Mood + Context -> Recommendation**

No AI API is required to demonstrate the core MORI concept.

## 35.3 Motion Implementation

Motion values should be centralized where practical so timing, easing, and reduced-motion behavior remain consistent.

Avoid scattering unrelated animation constants across components.

## 35.4 Accessibility Preferences

Reduced-motion preference should be detected at the presentation layer.

It must not alter routing, content availability, support access, or core functionality.

When reduced motion is active, animated states should resolve directly to their meaningful resting state.

---

# 36. Concept Success Criteria

Because MORI is a portfolio concept, fabricated product metrics must not be used.

Instead, evaluate the prototype through design objectives.

## Clarity

A visitor can explain MORI's purpose after experiencing the landing page.

## Low Cognitive Load

Core tasks can be completed without navigating a large menu or choosing among many tools.

## Direction

The check-in produces one obvious next action.

## Emotional Fit

The experience feels calm without becoming vague or decorative.

## Trust

MORI clearly distinguishes wellness support from diagnosis, therapy, and emergency intervention.

## Differentiation

The experience does not feel like another meditation library, mood dashboard, AI therapist, or virtual pet.

## Portfolio Strength

The project demonstrates product reasoning, interaction design, ethical thinking, visual design, and implementation awareness.

---

# 37. Prototype Deliverables

## 37.1 Mobile Product

Design and prototype approximately seven primary screens or states:

1. Check-in
2. Understand
3. Context
4. MORI Response / One Small Step
5. Guided Activity
6. Reflection
7. Patterns

Additional states can demonstrate:

* Privacy
* Human support
* Settings
* Reduced-motion behavior
* Companion responses

These should not unnecessarily expand the core flow.

## 37.2 Marketing Website

Create one polished responsive marketing experience using the architecture defined in this PRD.

The site must demonstrate meaningful interaction rather than only displaying static mockups.

Core interactive moments:

* Check-in flow
* Recommendation routing
* Grounding
* Reflection
* Companion state response
* Support panel

## 37.3 Portfolio Case Study

Show:

**Problem -> Research -> Insight -> Product Principles -> UX Structure -> Core Flow -> Routing Logic -> Safety and Privacy -> Companion Concept -> Visual Identity -> Interaction System -> Final Product -> Marketing Experience -> Implementation -> Reflection**

The case study must clearly identify MORI as conceptual work.

---

# 38. Portfolio Presentation

Project header:

# MORI

**A quieter way to understand how you feel and decide what to do next.**

**Product Concept · UX/UI Design · Brand Direction · Frontend**

**Independent Concept Project · 2026**

The case study must clearly disclose that MORI is conceptual work.

The standalone MORI marketing experience can remain immersive and product-like, with a discreet concept disclosure rather than disrupting the hero.

Do not use:

* Fake testimonials
* Fake App Store ratings
* Fake user counts
* Fabricated research participants
* Fabricated clinical outcomes
* Fabricated impact metrics

---

# 39. Key Differentiator

MORI does not compete conceptually by offering more mental wellness content.

It reduces the distance between emotional uncertainty and useful action.

> **The shortest distance between "I don't feel okay" and "I can do something about this."**

The ambient companion supports this idea through quiet presence, not through gamification.

The interactive marketing experience demonstrates the idea rather than only describing it.

Every feature, animation, photograph, interface element, and line of copy should reinforce that principle.

---

# 40. North Star

MORI should never ask:

> **"How can we keep this user engaged?"**

before asking:

> **"What is the smallest useful thing we can help this person do right now?"**

That distinction defines the product.

**Less thinking. More grounding.**

**Less interface. More breathing room.**
