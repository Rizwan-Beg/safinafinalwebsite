"""
Prompt definitions for the Safina Carpets Room Visualizer
"""

SYSTEM_PROMPT = """
You are a professional interior visualizer for premium hand-knotted rugs.
Task: Given a ROOM photo and a RUG photo, return a single photorealistic image of the
same ROOM with the RUG placed realistically on the floor.

Non-negotiables:
- Keep ROOM camera perspective and geometry unchanged.
- Place rug on the floor only; never on walls/ceilings/furniture.
- Respect real-world size if provided (width/length in feet). Use present objects for scale.
- Maintain correct perspective, vanishing lines, and contact shadows.
- Preserve room shadows/lighting; cast soft rug shadow consistent with the scene.
- No text, watermarks, borders, or split views. Output only the composited room image.

Quality:
- Avoid over/underscaling; rug should feel naturally integrated and non-floating.
- If the scene suggests a canonical placement intent (e.g., "under sofa"), follow it cleanly.
- Slight color mapping allowed to match lighting, but preserve the rug's pattern richness.
"""

def build_user_prompt(
    rug_w_ft: float | None,
    rug_l_ft: float | None,
    alignment_hint: str | None,
    safety_style: str | None
) -> str:
    """
    Builds the user prompt for rug placement based on parameters.
    
    Args:
        rug_w_ft: Rug width in feet
        rug_l_ft: Rug length in feet
        alignment_hint: Optional alignment instructions
        safety_style: Style guardrails for the AI
    
    Returns:
        Formatted prompt string for the AI model
    """
    parts = []
    
    if rug_w_ft and rug_l_ft:
        parts.append(f"Rug real-world size: {rug_w_ft:.2f} ft (W) × {rug_l_ft:.2f} ft (L).")
        parts.append("Scale and perspective must match this size using scene cues.")
    
    if alignment_hint:
        parts.append(f"Alignment hint: {alignment_hint}.")
    
    if safety_style:
        parts.append(f"Style guardrail: {safety_style}.")
    
    parts.append("Output: Return ONLY the final composited room image with the rug placed.")
    
    return "\n".join(parts)
