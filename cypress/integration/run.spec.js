/// <reference types="Cypress" />

const runId36524a4c = '1';
const runId1908f394 = '49';

// TODO: get list from DB instead of hardcoding it here
const slugs3652 = [
	{ name: 'CompExmplsExp', text: 'Compare exported symbols (Examples)', value: '99', chart: [[ runId36524a4c, 99 ]] },
	{ name: 'CompSrcExp', text: 'Compare exported symbols (src)', value: '57', chart: [[ runId36524a4c, 57 ]] },
	{ name: 'DocsDecl', text: 'Docs vs. Declaration', value: '624', chart: [[ runId36524a4c, 624 ]] },
	{ name: 'DocsExamples', text: 'Scan Docs for broken example links', value: '26', chart: [[ runId36524a4c, 26 ]] },
	{ name: 'DocsExternals', text: 'Scan Docs for broken external links', value: '9', chart: [[ runId36524a4c, 9 ]] },
	{ name: 'NonDocsExternals', text: 'Scan Non-Docs for broken external links', value: '30', chart: [[ runId36524a4c, 30 ]] },
	{ name: 'ObjDecl', text: 'Objects vs. Declaration', value: '1197', chart: [[ runId36524a4c, 1197 ]] },
	{ name: 'ScanCompletion', text: 'Orphaned pages', value: '-' },
	{ name: 'SrcDecl', text: 'Source vs. Declaration', value: '31', chart: [[ runId36524a4c, 31 ]] },
	{ name: 'TSCompiler', text: 'Test with TypeScript compiler', value: '-' },
	// { name: 'UnitTests', text: 'Unit Tests (browser)', value: '-' }, // FIXME: error actually
	{ name: 'UnitTests', text: 'Unit Tests (browser)', value: '0' },
	{ name: 'LawVsReality', text: 'Declared vs. encountered parameters', value: '-' },

	{ name: 'DoobsDoc', text: 'DoobsDoc linting', value: '157', chart: [[ runId36524a4c, 157 ]] },
	{ name: 'HTMLLint', text: 'HTML linting', value: '41', chart: [[ runId36524a4c, 41 ]] },
	{ name: 'ESLintJsFiles', text: 'ESLint (JavaScript, stand-alone files)', value: '65', chart: [[ runId36524a4c, 65 ]] },
	{ name: 'ESLintScriptTags', text: 'ESLint (JavaScript, <script> elements)', value: '261', chart: [[ runId36524a4c, 261 ]] },
	{ name: 'ESLintCodeTags', text: 'ESLint (JavaScript, <code> elements)', value: '886', chart: [[ runId36524a4c, 886 ]] },
	{ name: 'ESLintTsFiles', text: 'ESLint (TypeScript)', value: '25', chart: [[ runId36524a4c, 25 ]] },
	{ name: 'StyleLint', text: 'StyleLint (CSS)', value: '7', chart: [[ runId36524a4c, 7 ]] },
	{ name: 'glslang', text: 'glsl Validator', value: '-' },

	{ name: 'TypeCore', text: 'Core', value: '-' },
	{ name: 'TypeExamples', text: 'Examples', value: '-' },

	{ name: 'ProfTraces', text: 'Trace', value: '-' },
	{ name: 'ProfStats', text: 'Stats', value: '-' },
	{ name: 'ProfVisual', text: 'Visual', value: '-' },
	{ name: 'ProfConsole', text: 'Console', value: '1385', chart: [[ runId36524a4c, 1385 ]] },

	{ name: 'DocsDocsDeps', text: 'Dependencies between doc pages', value: '209', chart: [[ runId36524a4c, 209 ]] },
	{ name: 'DocsSrcDeps', text: 'Dependencies between docs and source', value: '-' },
	{ name: 'SrcSrcDeps', text: 'Dependencies between source files', value: '-' },
	{ name: 'RuntimeDeps', text: 'Dependencies of examples', value: '-' }
];

// TODO: get list from DB instead of hardcoding it here
const slugs1908 = [
	{ name: 'CompExmplsExp', value: '99', parent: '99', baseline: '99', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 99 ], [ runId1908f394, 99 ]] },
	{ name: 'CompSrcExp', value: '57', parent: '57', baseline: '57', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 57 ], [ runId1908f394, 57 ]] },
	{ name: 'DocsDecl', value: '624', parent: '624', baseline: '624', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 624 ], [ runId1908f394, 624 ]] },
	{ name: 'DocsExamples', value: '26', parent: '26', baseline: '26', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 26 ], [ runId1908f394, 26 ]] },
	{ name: 'DocsExternals', value: '9', parent: '9', baseline: '9', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 9 ], [ runId1908f394, 9 ]] },
	{ name: 'NonDocsExternals', value: '30', parent: '30', baseline: '30', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 30 ], [ runId1908f394, 30 ]] },
	{ name: 'ObjDecl', value: '1197', parent: '1197', baseline: '1197', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 1197 ], [ runId1908f394, 1197 ]] },
	{ name: 'ScanCompletion', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'SrcDecl', value: '31', parent: '31', baseline: '31', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 31 ], [ runId1908f394, 31 ]] },
	{ name: 'TSCompiler', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	// { name: 'UnitTests', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' }, // FIXME: error actually
	{ name: 'UnitTests', value: '0', parent: '0', baseline: '0', parentDelta: '±0.00', baselineDelta: '±0.00' },
	{ name: 'LawVsReality', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },

	{ name: 'DoobsDoc', value: '157', parent: '157', baseline: '157', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 157 ], [ runId1908f394, 157 ]] },
	{ name: 'HTMLLint', value: '41', parent: '41', baseline: '41', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 41 ], [ runId1908f394, 41 ]] },
	{ name: 'ESLintJsFiles', value: '65', parent: '65', baseline: '65', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 65 ], [ runId1908f394, 65 ]] },
	{ name: 'ESLintScriptTags', value: '261', parent: '261', baseline: '261', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 261 ], [ runId1908f394, 261 ]] },
	{ name: 'ESLintCodeTags', value: '886', parent: '886', baseline: '886', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 886 ], [ runId1908f394, 886 ]] },
	{ name: 'ESLintTsFiles', value: '25', parent: '25', baseline: '25', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 25 ], [ runId1908f394, 25 ]] },
	{ name: 'StyleLint', value: '7', parent: '7', baseline: '7', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 7 ], [ runId1908f394, 7 ]] },
	{ name: 'glslang', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },

	{ name: 'TypeCore', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'TypeExamples', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },

	{ name: 'ProfTraces', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'ProfStats', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'ProfVisual', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'ProfConsole', value: '1386', parent: '1385', baseline: '1385', parentDelta: '+0.07', baselineDelta: '+0.07', chart: [[ runId36524a4c, 1385 ], [ runId1908f394, 1386 ]],
		hits: {
			"examples/css2d_label.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/css3d_orthographic.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/css3d_periodictable.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/css3d_sandbox.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_animation_authoring.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_animation_groups.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/misc_animation_keys.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_boxselection.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_controls_drag.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_controls_fly.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/misc_controls_map.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_controls_orbit.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_controls_pointerlock.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_controls_trackball.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_controls_transform.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/misc_exporter_collada.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_exporter_draco.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_exporter_gltf.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_exporter_obj.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_exporter_ply.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/misc_exporter_stl.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/misc_lookat.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webaudio_orientation.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webaudio_visualizer.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webgl_animation_cloth.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_animation_keyframes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_animation_multiple.html": { value: "6", parent: "6", parentDelta: "±0.00", baseline: "6", baselineDelta: "±0.00" },
			"examples/webgl_animation_skinning_additive_blending.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_animation_skinning_blending.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_animation_skinning_morph.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_compression.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_constructed_from_geometry.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_custom_attributes_particles.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_drawrange.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_indexed.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_instancing_billboards.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_instancing_interleaved.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_instancing.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_lines_indexed.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_lines.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_morphtargets.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_points_interleaved.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_points.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_rawshader.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_selective_draw.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_buffergeometry_uint.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_camera_array.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_camera_cinematic.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_camera_logarithmicdepthbuffer.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_camera.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_clipping_advanced.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_clipping_intersection.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_clipping.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_clipping_stencil.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_custom_attributes_lines.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_custom_attributes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_custom_attributes_points.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_custom_attributes_points2.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_custom_attributes_points3.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_decals.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_depth_texture.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_effects_anaglyph.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_effects_ascii.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_effects_parallaxbarrier.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_effects_peppersghost.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_effects_stereo.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_fire.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_framebuffer_texture.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_furnace_test.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometries_parametric.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometries.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_colors_lookuptable.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_geometry_colors.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_convex.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_cube.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_dynamic.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_extrude_shapes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_extrude_shapes2.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_geometry_extrude_splines.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_hierarchy.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_hierarchy2.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_minecraft_ao.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_minecraft.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_normals.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_geometry_nurbs.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_shapes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_spline_editor.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_teapot.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_geometry_terrain_fog.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_terrain.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_terrain_raycast.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_text.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_geometry_text_shapes.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_geometry_text_stroke.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_gpgpu_birds.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_gpgpu_protoplanet.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_gpgpu_water.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_helpers.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_instancing_dynamic.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_instancing_modified.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_instancing_performance.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_instancing_raycast.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_instancing_scatter.html": { value: "6", parent: "6", parentDelta: "±0.00", baseline: "6", baselineDelta: "±0.00" },
			"examples/webgl_interactive_buffergeometry.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_interactive_cubes_gpu.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_interactive_cubes_ortho.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_interactive_cubes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_interactive_lines.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_interactive_points.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_interactive_raycasting_points.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_interactive_voxelpainter.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_layers.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_lensflares.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lightningstrike.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lightprobe_cubecamera.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lightprobe.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lights_hemisphere.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_lights_physical.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lights_pointlights.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lights_pointlights2.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lights_rectarealight.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lights_spotlight.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_lights_spotlights.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lines_colors.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lines_dashed.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lines_fat.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_lines_fat_wireframe.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_lines_sphere.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_3ds.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_3mf_materials.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_3mf.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_amf.html": { value: "6", parent: "6", parentDelta: "±0.00", baseline: "6", baselineDelta: "±0.00" },
			"examples/webgl_loader_assimp.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_bvh.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_collada_kinematics.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_collada.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_collada_skinning.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_loader_draco.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_fbx_nurbs.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_fbx.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_gcode.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_gltf_extensions.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_gltf.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_imagebitmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_json_claraio.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_kmz.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_ldraw.html": { value: "5", parent: "5", parentDelta: "±0.00", baseline: "5", baselineDelta: "±0.00" },
			"examples/webgl_loader_lwo.html": { value: "62", parent: "62", parentDelta: "±0.00", baseline: "62", baselineDelta: "±0.00" },
			"examples/webgl_loader_md2_control.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_md2.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_mdd.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_mmd_audio.html": { value: "1", parent: "-", parentDelta: "-", baseline: "-", baselineDelta: "-" },
			"examples/webgl_loader_mmd.html": { value: "8", parent: "8", parentDelta: "±0.00", baseline: "8", baselineDelta: "±0.00" },
			"examples/webgl_loader_mmd_pose.html": { value: "13", parent: "13", parentDelta: "±0.00", baseline: "13", baselineDelta: "±0.00" },
			"examples/webgl_loader_nodes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_nrrd.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_loader_obj_mtl.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_loader_obj.html": { value: "7", parent: "7", parentDelta: "±0.00", baseline: "7", baselineDelta: "±0.00" },
			"examples/webgl_loader_obj2_options.html": { value: "6", parent: "6", parentDelta: "±0.00", baseline: "6", baselineDelta: "±0.00" },
			"examples/webgl_loader_obj2.html": { value: "79", parent: "79", parentDelta: "±0.00", baseline: "79", baselineDelta: "±0.00" },
			"examples/webgl_loader_pcd.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_pdb.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_ply.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_prwm.html": { value: "10", parent: "10", parentDelta: "±0.00", baseline: "10", baselineDelta: "±0.00" },
			"examples/webgl_loader_stl.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_svg.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_basis.html": { value: "7", parent: "7", parentDelta: "±0.00", baseline: "7", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_dds.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_exr.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_hdr.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_ktx.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_pvrtc.html": { value: "335", parent: "335", parentDelta: "±0.00", baseline: "335", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_rgbm.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_texture_tga.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_ttf.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_vrm.html": { value: "62", parent: "62", parentDelta: "±0.00", baseline: "62", baselineDelta: "±0.00" },
			"examples/webgl_loader_vrml.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_loader_vtk.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_loader_x.html": { value: "7", parent: "7", parentDelta: "±0.00", baseline: "7", baselineDelta: "±0.00" },
			"examples/webgl_lod.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_marchingcubes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_blending_custom.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_blending.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_bumpmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_car.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_channels.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_compile.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_cubemap_balls_reflection.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_cubemap_balls_refraction.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_cubemap_dynamic.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_cubemap_mipmaps.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_cubemap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_cubemap_refraction.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_curvature.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_displacementmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_envmaps_exr.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_envmaps_hdr_nodes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_envmaps_hdr.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_envmaps_parallax.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_envmaps.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_envmaps_pmrem_nodes.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_grass.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_lightmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_matcap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_modified.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_nodes.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_normalmap_object_space.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_normalmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_parallaxmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_physical_clearcoat.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_physical_reflectivity.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_materials_physical_sheen.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_physical_transparency.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_shaders_fresnel.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_standard.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_texture_anisotropy.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_texture_canvas.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_texture_filters.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_texture_manualmipmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_texture_partialupdate.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_texture_rotation.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_variations_basic.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_variations_lambert.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_variations_phong.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_variations_physical.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_variations_standard.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_variations_toon.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_video_webcam.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_materials_wireframe.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_math_obb.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_math_orientation_transform.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_mirror_nodes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_mirror.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_modifier_simplifier.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_modifier_subdivision.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_modifier_tessellation.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_morphtargets_horse.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_morphtargets.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_morphtargets_sphere.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_multiple_canvases_circle.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_multiple_canvases_complex.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_multiple_canvases_grid.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_multiple_elements.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_multiple_elements_text.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webgl_multiple_renderers.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_multiple_scenes_comparison.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_multiple_views.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_panorama_cube.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_panorama_dualfisheye.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_panorama_equirectangular.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_performance_doublesided.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_performance_nodes.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webgl_performance.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_performance_static.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_pmrem_test.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_points_billboards.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_points_dynamic.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_points_sprites.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_points_waves.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_advanced.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_afterimage.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_backgrounds.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_crossfade.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_dof.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_dof2.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_fxaa.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_glitch.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_godrays.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_masking.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_nodes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_nodes_pass.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_outline.html": { value: "4", parent: "4", parentDelta: "±0.00", baseline: "4", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_pixel.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_procedural.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_rgb_halftone.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_sao.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_smaa.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_sobel.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_ssaa.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_ssaa_unbiased.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_ssao.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_taa.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_unreal_bloom.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_postprocessing_unreal_bloom_selective.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_raycast_sprite.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_raycast_texture.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_raymarching_reflect.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_read_float_buffer.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_refraction.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_rtt.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_sandbox.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shader_lava.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shader.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_shader2.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shaders_ocean.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shaders_ocean2.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shaders_sky.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_shaders_tonemapping.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shaders_vector.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shading_physical.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shadow_contact.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap_csm.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap_pcss.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap_performance.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap_pointlight.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap_viewer.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_shadowmap_vsm.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_shadowmesh.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_simple_gi.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_skinning_simple.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_sprites_nodes.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_sprites.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_test_memory.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_test_memory2.html": { value: "78", parent: "78", parentDelta: "±0.00", baseline: "78", baselineDelta: "±0.00" },
			"examples/webgl_tiled_forward.html": { value: "1", parent: "1", parentDelta: "±0.00", baseline: "1", baselineDelta: "±0.00" },
			"examples/webgl_tonemapping.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" },
			"examples/webgl_trails.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_video_panorama_equirectangular.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_water_flowmap.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_water.html": { value: "2", parent: "2", parentDelta: "±0.00", baseline: "2", baselineDelta: "±0.00" },
			"examples/webgl_materials_subsurface_scattering.html": { value: "3", parent: "3", parentDelta: "±0.00", baseline: "3", baselineDelta: "±0.00" }
		},
		diff: {
			'examples/webgl_loader_mmd_audio.html': { value: '1', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' }
		}
	},

	{ name: 'DocsDocsDeps', value: '209', parent: '209', baseline: '209', parentDelta: '±0.00', baselineDelta: '±0.00', chart: [[ runId36524a4c, 209 ], [ runId1908f394, 209 ]] },
	{ name: 'DocsSrcDeps', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'SrcSrcDeps', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' },
	{ name: 'RuntimeDeps', value: '-', parent: '-', baseline: '-', parentDelta: '-', baselineDelta: '-' }
];


describe( 'CI - Web - Runs', () => {

	it( 'Visits /runs, clicks first baseline run', () => {

		cy.visit( '/' );

		cy.get( '[data-cy=runs-list]' ).children().should( 'have.length.greaterThan', 4 );

		cy.contains( '36524a4c6667e88e128f78d78b7a29acf80e46d8' );
		cy.contains( '1908f394e10d4047da85fdff0063b0b2951f1d68' );
		cy.contains( '4488ce0559da638716282f4fb25d2a7e1607be8a' );
		cy.contains( 'e3933b4fc05868c86b6f626a194611a4f251f2c3' );
		cy.contains( '0b05e30b84aee71e381589bb404db33c9d440a1e' );

		cy.contains( `#${runId36524a4c}` ).click();

		cy.hash().should( 'match', new RegExp( `^#\/runs\/${runId36524a4c}$` ) );

	} );


	it.only( '/runs/base (36524a4c…)', () => {

		cy.visit( `/#/runs/${runId36524a4c}` );

		// complete history
		cy.get( '[data-cy=history-list]' )
			.should( 'contain.text', 'aa134d7db2f8d1c314d5792b0c93f974de97eb62' )
			.and( 'contain.text', '6ed29ec8e4c04f0880e4a5c5811c851bcd185fb9' )
			.and( 'contain.text', 'c3f58ff89c54e4283f1888976b38551bceb170f2' )
			.and( 'contain.text', 'e78da3304dc5b07a0fd634b24e12a525d5f73b79' )
			.and( 'contain.text', 'ba98f1de20ef00211c81260ca48c54e0cb2f043d' )
			.and( 'contain.text', 'b537ebda9c59fafc4579c500fb5686132c451dfe' )
			.and( 'contain.text', '5fe8e7121b713db31dd4bb183493bd40ec3447eb' )
			.and( 'contain.text', '5c6bbffa43b7ddc2f0fcf8d065ed193a075b7c2c' )
			.and( 'contain.text', 'a0ebdb20536fb2bf2504eed643de0caaee2f3368' )
			.and( 'contain.text', 'ea4c91c5e1f78d3e7d8fc8fe7ce00f933c6cd8d2' )
			.and( 'contain.text', '36524a4c6667e88e128f78d78b7a29acf80e46d8' )
			.find( 'a' )
			.should( 'have.length', 1 )
			.and( 'have.attr', 'href', `#/runs/${runId36524a4c}` )
			.and( 'have.text', ` #${runId36524a4c} ` );

		cy.get( '[data-cy=history-list-missing]' ).should( 'have.length', 10 );

		cy.get( '[data-cy=history-list-base]' ).should( 'have.length', 1 ).and( 'exist' );

		slugs3652.forEach( el => {

			cy.get( `[data-cy=link-${el.name}]` ).should( 'contain.text', el.text );
			cy.get( `[data-cy=result-${el.name}]` ).should( 'contain.text', el.value );
			cy.get( `[data-cy=parent-${el.name}]` ).should( 'contain.text', '-' );
			cy.get( `[data-cy=parent-delta-${el.name}]` ).should( 'contain.text', '-' );
			cy.get( `[data-cy=baseline-${el.name}]` ).should( 'contain.text', '-' );
			cy.get( `[data-cy=baseline-delta-${el.name}]` ).should( 'contain.text', '-' );

			cy.get( `[data-cy=hits-button-${el.name}]` ).should( 'not.be.visible' );
			cy.get( `[data-cy=diff-button-${el.name}]` ).should( 'not.be.visible' );

			if ( el.chart ) {

				cy.get( `[data-cy=chart-${el.name}]` ).then( $el => {

					expect( $el.data( 'cy-data' ) ).to.deep.equal( el.chart, 'correct chart data' );

				} );

			}

		} );

	} );


	it( '/runs/1st child (1908f394…) main', ( ) => {

		cy.visit( '/' );

		cy.get( '[data-cy=runs-list]' ).children().should( 'have.length.greaterThan', 4 );

		cy.contains( '36524a4c6667e88e128f78d78b7a29acf80e46d8' );
		cy.contains( '1908f394e10d4047da85fdff0063b0b2951f1d68' );
		cy.contains( '4488ce0559da638716282f4fb25d2a7e1607be8a' );
		cy.contains( 'e3933b4fc05868c86b6f626a194611a4f251f2c3' );
		cy.contains( '0b05e30b84aee71e381589bb404db33c9d440a1e' );

		cy.contains( `#${runId1908f394}` ).click();

		cy.url().should( 'match', new RegExp( `#\/runs\/${runId1908f394}$` ) );

	} );


	it( '/runs/1st child (1908f394…) history', ( ) => {

		cy.visit( '/' );
		cy.contains( `#${runId1908f394}` ).click();

		// check history
		cy.get( '[data-cy=history-list]' )
			.should( 'contain.text', '36524a4c6667e88e128f78d78b7a29acf80e46d8' )
			.and( 'contain.text', '1908f394e10d4047da85fdff0063b0b2951f1d68' );
		cy.get( '[data-cy=history-list] a' )
			.should( 'have.length', 2 );
		cy.get( '[data-cy=history-list] a' )
			.eq( 0 )
			.should( 'have.attr', 'href', `#/runs/${runId36524a4c}` )
			.and( 'have.text', ` #${runId36524a4c} ` );
		cy.get( '[data-cy=history-list] a' )
			.eq( 1 )
			.should( 'have.attr', 'href', `#/runs/${runId1908f394}` )
			.and( 'have.text', ` #${runId1908f394} ` );

		cy.get( '[data-cy=history-list-missing]' ).should( 'have.length', 0 );
		cy.get( '[data-cy=history-list-base]' ).should( 'have.length', 1 ).and( 'exist' );

	} );


	it( '/runs/1st child (1908f394…) runInfo', ( ) => {

		cy.visit( '/' );
		cy.contains( `#${runId1908f394}` ).click();

		// check runInfo
		cy.get( '[data-cy=runInfo-start]' ).should( 'contain.text', 'Thu, 30 Apr 2020 20:18:54 GMT' );
		cy.get( '[data-cy=runInfo-reason]' ).should( 'contain.text', 'CI' );
		cy.get( '[data-cy=runInfo-baseline]' ).should( 'contain.text', `#${runId36524a4c}` );
		cy.get( '[data-cy=runInfo-parent]' ).should( 'contain.text', `#${runId36524a4c}` );
		cy.get( '[data-cy=runInfo-errors]' ).should( 'contain.text', '1' );

	} );


	it( '/runs/1st child (1908f394…) overview - first level', ( ) => {

		cy.visit( '/' );
		cy.contains( `#${runId1908f394}` ).click();

		// check overview
		cy.get( '[data-cy=overview]' ).within( () => {

			slugs1908.forEach( el => {

				cy.get( `[data-cy=result-${el.name}]` ).should( 'have.text', ` ${el.value} ` );
				cy.get( `[data-cy=parent-${el.name}]` ).should( 'have.text', ` ${el.parent} ` );
				cy.get( `[data-cy=parent-delta-${el.name}]` ).should( 'have.text', ` ${el.parentDelta} ` );
				cy.get( `[data-cy=baseline-${el.name}]` ).should( 'have.text', ` ${el.baseline} ` );
				cy.get( `[data-cy=baseline-delta-${el.name}]` ).should( 'have.text', ` ${el.baselineDelta} ` );

				if ( el.chart ) {

					cy.get( `[data-cy=chart-${el.name}]` ).then( $el => {

						expect( $el.data( 'cy-data' ) ).to.deep.equal( el.chart, 'correct chart data' );

					} );

				}

			} );

		} );

	} );


	it( '/runs/1st child (1908f394…) overview - hits', ( ) => {

		cy.visit( '/' );
		cy.contains( `#${runId1908f394}` ).click();

		// check overview
		cy.get( '[data-cy=overview]' ).within( () => {

			slugs1908.forEach( el => {

				if ( ! el.hits ) {

					cy.get( `[data-cy=hits-button-${el.name}]` ).should( 'not.exist' );

				} else {

					cy.get( `[data-cy=hits-button-${el.name}]` )
						.scrollIntoView()
						.should( 'be.visible' )
						.click();

					cy.get( `[data-cy*="link-${el.name}-——"]` )
						.should( 'have.length', Object.keys( el.hits ).length )
						.each( $el => expect( $el.text() ).to.match( /(src|examples|docs)\/.+?_.+?\.html/, 'probable link' ) );

					Object.keys( el.hits ).forEach( filename => {

						const row = el.hits[ filename ];

						cy.get( `[data-cy="result-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.value} ` );
						cy.get( `[data-cy="parent-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.parent} ` );
						cy.get( `[data-cy="parent-delta-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.parentDelta} ` );
						cy.get( `[data-cy="baseline-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.baseline} ` );
						cy.get( `[data-cy="baseline-delta-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.baselineDelta} ` );

					} );

				}

			} );

		} );

	} );


	it( '/runs/1st child (1908f394…) overview - diff', ( ) => {

		cy.visit( '/' );
		cy.contains( `#${runId1908f394}` ).click();

		// check overview
		cy.get( '[data-cy=overview]' ).within( () => {

			slugs1908.forEach( el => {

				if ( ! el.diff ) {

					cy.get( `[data-cy=diff-button-${el.name}]` ).should( 'not.exist' );

				} else {

					cy.get( `[data-cy=diff-button-${el.name}]` )
						.scrollIntoView()
						.should( 'be.visible' )
						.click();

					cy.get( `[data-cy*="link-${el.name}-——"]` )
						.should( 'have.length', Object.keys( el.diff ).length )
						.each( $el => expect( $el.text() ).to.match( /(src|examples|docs)\/.+?_.+?\.html/, 'probable link' ) );

					Object.keys( el.diff ).forEach( filename => {

						const row = el.diff[ filename ];

						cy.get( `[data-cy="result-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.value} ` );
						cy.get( `[data-cy="parent-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.parent} ` );
						cy.get( `[data-cy="parent-delta-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.parentDelta} ` );
						cy.get( `[data-cy="baseline-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.baseline} ` );
						cy.get( `[data-cy="baseline-delta-${el.name}-—— ${filename}"]` ).should( 'have.text', ` ${row.baselineDelta} ` );

					} );

				}

			} );

		} );

	} );

} );

