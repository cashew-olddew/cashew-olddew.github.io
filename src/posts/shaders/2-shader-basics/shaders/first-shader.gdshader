shader_type canvas_item;

uniform float speed : hint_range(0.0, 10.0, 0.1) = 1.0;

uniform vec4 deep_color : source_color = vec4(0.02, 0.05, 0.25, 1.0);
uniform vec4 glow_color : source_color = vec4(0.15, 0.55, 1.00, 1.0);
uniform vec4 pulse_color : source_color = vec4(0.6, 0.9, 1.0, 1.0);
uniform vec4 rim_color : source_color = vec4(0.3, 0.75, 1.0, 1.0);

uniform float portal_outer_size : hint_range(0.0, 2.0, 0.01) = 0.41;
uniform float portal_inner_size : hint_range(0.0, 2.0, 0.01) = 0.37;

uniform float rim_inner_size : hint_range(0.0, 2.0, 0.01) = 0.34;

uniform float gradient_strength : hint_range(0.0, 5.0, 0.01) = 1.3;

uniform float pulse_frequency : hint_range(0.0, 20.0, 0.1) = 6.0;
uniform float pulse_strength : hint_range(0.0, 1.0, 0.01) = 0.6;

uniform float rim_strength : hint_range(0.0, 10.0, 0.1) = 1.8;

void fragment() {

    // Distance from center
    float d = distance(UV, vec2(0.5));

    // Main portal shape
    float circle = smoothstep(
        portal_outer_size,
        portal_inner_size,
        d
    );

    // Background gradient
    vec3 col = mix(
        glow_color.rgb,
        deep_color.rgb,
        d * gradient_strength
    );

    // Apply portal mask
    col *= circle;

    // Animated pulse
    float pulse = sin(
        d * pulse_frequency
        - TIME * speed
    );

    // Convert from -1..1 to 0..1
    pulse = pulse * 0.5 + 0.5;

    // Blend pulse color
    col = mix(
        col,
        pulse_color.rgb,
        pulse * pulse_strength * circle
    );

    // Rim
    float outer_circle = smoothstep(
        portal_outer_size,
        portal_inner_size,
        d
    );

    float inner_circle = smoothstep(
        portal_inner_size,
        rim_inner_size,
        d
    );

    float rim = outer_circle - inner_circle;

    // Add rim glow
    col += rim_color.rgb * rim * rim_strength;
    COLOR = vec4(col, 1.0);
}