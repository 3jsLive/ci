/// <reference types="Cypress" />

describe( 'CI - Web - Checks', () => {

	// Checks
	it( 'checks/CompExmplsExp (36524a4c…)', () => {

		cy.visit( '/#/runs/1/checks/CompExmplsExp' );

		const results = {
			JavaScript: {
				'CameraControls': 'examples/jsm/controls/experimental/CameraControls',
				'TransformControlsGizmo': 'examples/jsm/controls/TransformControls',
				'TransformControlsPlane': 'examples/jsm/controls/TransformControls',
				'CSM': 'examples/jsm/csm/CSM',
				'CSMHelper': 'examples/jsm/csm/CSMHelper',
				'default': 'examples/jsm/csm/Frustum',
				'__object': 'examples/jsm/csm/Shader',
				'NodeMaterialLoader': 'examples/jsm/loaders/NodeMaterialLoader',
				'NodeMaterialLoaderUtils': 'examples/jsm/loaders/NodeMaterialLoader',
				'LoadedMeshUserOverride': 'examples/jsm/loaders/obj2/shared/MeshReceiver',
				'SubSlotNode': 'examples/jsm/nodes/utils/SubSlotNode',
				'initJank': 'examples/jsm/offscreen/jank',
				'init': 'examples/jsm/offscreen/scene',
				'CannonPhysics': 'examples/jsm/physics/CannonPhysics',
				'ACESFilmicToneMappingShader': 'examples/jsm/shaders/ACESFilmicToneMappingShader',
				'FlakesTexture': 'examples/jsm/textures/FlakesTexture',
				'PackedPhongMaterial': 'examples/jsm/utils/GeometryCompressionUtils'
			},
			TypeScript: {
				'CCDIKHelper': 'examples/jsm/animation/CCDIKSolver',
				'IKS': 'examples/jsm/animation/CCDIKSolver',
				'AudioManager': 'examples/jsm/animation/MMDAnimationHelper',
				'AudioManagerParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'GrantSolver': 'examples/jsm/animation/MMDAnimationHelper',
				'MMDAnimationHelperAddParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'MMDAnimationHelperParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'MMDAnimationHelperPoseParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'Constraint': 'examples/jsm/animation/MMDPhysics',
				'MMDPhysicsHelper': 'examples/jsm/animation/MMDPhysics',
				'MMDPhysicsParameter': 'examples/jsm/animation/MMDPhysics',
				'ResourceManager': 'examples/jsm/animation/MMDPhysics',
				'RigidBody': 'examples/jsm/animation/MMDPhysics',
				'AsciiEffectOptions': 'examples/jsm/effects/AsciiEffect',
				'OutlineEffectParameters': 'examples/jsm/effects/OutlineEffect',
				'ColladaExporterOptions': 'examples/jsm/exporters/ColladaExporter',
				'ColladaExporterResult': 'examples/jsm/exporters/ColladaExporter',
				'DRACOExporterOptions': 'examples/jsm/exporters/DRACOExporter',
				'GLTFExporterOptions': 'examples/jsm/exporters/GLTFExporter',
				'PLYExporterOptions': 'examples/jsm/exporters/PLYExporter',
				'STLExporterOptions': 'examples/jsm/exporters/STLExporter',
				'LightningSegment': 'examples/jsm/geometries/LightningStrike',
				'LightningSubray': 'examples/jsm/geometries/LightningStrike',
				'RandomGenerator': 'examples/jsm/geometries/LightningStrike',
				'RayParameters': 'examples/jsm/geometries/LightningStrike',
				'LineMaterialParameters': 'examples/jsm/lines/LineMaterial',
				'Assimp': 'examples/jsm/loaders/AssimpLoader',
				'BVH': 'examples/jsm/loaders/BVHLoader',
				'Collada': 'examples/jsm/loaders/ColladaLoader',
				'DDS': 'examples/jsm/loaders/DDSLoader',
				'EXR': 'examples/jsm/loaders/EXRLoader',
				'GLTF': 'examples/jsm/loaders/GLTFLoader',
				'GLTFParser': 'examples/jsm/loaders/GLTFLoader',
				'KTX': 'examples/jsm/loaders/KTXLoader',
				'LWO': 'examples/jsm/loaders/LWOLoader',
				'LWOLoaderParameters': 'examples/jsm/loaders/LWOLoader',
				'MDD': 'examples/jsm/loaders/MDDLoader',
				'MMDLoaderAnimationObject': 'examples/jsm/loaders/MMDLoader',
				'MaterialCreatorOptions': 'examples/jsm/loaders/MTLLoader',
				'MaterialInfo': 'examples/jsm/loaders/MTLLoader',
				'TexParams': 'examples/jsm/loaders/MTLLoader',
				'PDB': 'examples/jsm/loaders/PDBLoader',
				'PVR': 'examples/jsm/loaders/PVRLoader',
				'RGBE': 'examples/jsm/loaders/RGBELoader',
				'SVGResult': 'examples/jsm/loaders/SVGLoader',
				'StrokeStyle': 'examples/jsm/loaders/SVGLoader',
				'XResult': 'examples/jsm/loaders/XLoader',
				'CMYK': 'examples/jsm/math/ColorConverter',
				'HSL': 'examples/jsm/math/ColorConverter',
				'Face': 'examples/jsm/math/ConvexHull',
				'HalfEdge': 'examples/jsm/math/ConvexHull',
				'VertexList': 'examples/jsm/math/ConvexHull',
				'VertexNode': 'examples/jsm/math/ConvexHull',
				'CutByPlaneOutput': 'examples/jsm/misc/ConvexObjectBreaker',
				'Variable': 'examples/jsm/misc/GPUComputationRenderer',
				'MD2PartsConfig': 'examples/jsm/misc/MD2Character',
				'FunctionNodeInput': 'examples/jsm/nodes/core/FunctionNode',
				'NodeLibKeyword': 'examples/jsm/nodes/core/NodeLib',
				'NodeUniformParams': 'examples/jsm/nodes/core/NodeUniform',
				'StructNodeInput': 'examples/jsm/nodes/core/StructNode',
				'TempNodeParams': 'examples/jsm/nodes/core/TempNode',
				'RTTNodeOptions': 'examples/jsm/nodes/inputs/RTTNode',
				'NodeMaterialBuildParams': 'examples/jsm/nodes/materials/NodeMaterial',
				'SubSlots': 'examples/jsm/nodes/utils/SubSlot',
				'VelocityNodeParams': 'examples/jsm/nodes/utils/VelocityNode',
				'ColorShader': 'examples/jsm/objects/Fire',
				'DebugShader': 'examples/jsm/objects/Fire',
				'DiffuseShader': 'examples/jsm/objects/Fire',
				'DriftShader': 'examples/jsm/objects/Fire',
				'FireOptions': 'examples/jsm/objects/Fire',
				'ProjectionShader1': 'examples/jsm/objects/Fire',
				'ProjectionShader2': 'examples/jsm/objects/Fire',
				'ProjectionShader3': 'examples/jsm/objects/Fire',
				'SourceShader': 'examples/jsm/objects/Fire',
				'StormParams': 'examples/jsm/objects/LightningStorm',
				'ReflectorOptions': 'examples/jsm/objects/Reflector',
				'RefractorOptions': 'examples/jsm/objects/Refractor',
				'WaterOptions': 'examples/jsm/objects/Water2',
				'BokehPassParamters': 'examples/jsm/postprocessing/BokehPass',
				'HalftonePassParameters': 'examples/jsm/postprocessing/HalftonePass',
				'SAOPassParams': 'examples/jsm/postprocessing/SAOPass',
				'XRControllerModel': 'examples/jsm/webxr/XRControllerModelFactory'
			}
		};

		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(1)' ).as( 'javascript-symbols-column' );
		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(2)' ).as( 'javascript-files-column' );

		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(1)' ).as( 'typescript-symbols-column' );
		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(2)' ).as( 'typescript-files-column' );

		cy.get( '@javascript-symbols-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@javascript-files-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@typescript-symbols-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );
		cy.get( '@typescript-files-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );

		// this way, i.e. jQuery, seems to be quite a bit faster than doing it via cypress
		cy.get( '@javascript-symbols-column' ).then( cells => {

			Object.keys( results.JavaScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@javascript-files-column' ).then( cells => {

			Object.values( results.JavaScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

		cy.get( '@typescript-symbols-column' ).then( cells => {

			Object.keys( results.TypeScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@typescript-files-column' ).then( cells => {

			Object.values( results.TypeScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

	} );

	it( 'checks/CompSrcExp (36524a4c…)', () => {

		cy.visit( '/#/runs/1/checks/CompSrcExp' );

		const results = {
			JavaScript: {
				'WebGLUtils': 'src/renderers/webgl/WebGLUtils',
				'DataTexture2DArray': 'src/textures/DataTexture2DArray'
			},
			TypeScript: {
				'AnimationAction': 'src/animation/AnimationAction',
				'ParseTrackNameResults': 'src/animation/PropertyBinding',
				'DirectGeometry': 'src/core/DirectGeometry',
				'Event': 'src/core/EventDispatcher',
				'GeometryIdCount': 'src/core/Geometry',
				'MorphColor': 'src/core/Geometry',
				'MorphNormals': 'src/core/Geometry',
				'MorphTarget': 'src/core/Geometry',
				'BufferGeometryUtils': 'src/core/InstancedBufferAttribute',
				'GeometryUtils': 'src/core/InstancedBufferAttribute',
				'Object3DIdCount': 'src/core/Object3D',
				'Intersection': 'src/core/Raycaster',
				'RaycasterParameters': 'src/core/Raycaster',
				'Vec2': 'src/extras/ShapeUtils',
				'HSL': 'src/math/Color',
				'Matrix': 'src/math/Matrix3',
				'SplineControlPoint': 'src/math/Triangle',
				'Vector': 'src/math/Vector2',
				'LinePieces': 'src/objects/LineSegments',
				'LineStrip': 'src/objects/LineSegments',
				'Shader': 'src/renderers/shaders/ShaderLib',
				'IUniform': 'src/renderers/shaders/UniformsLib',
				'cloneUniforms': 'src/renderers/shaders/UniformsUtils',
				'mergeUniforms': 'src/renderers/shaders/UniformsUtils',
				'WebGLBufferRenderer': 'src/renderers/webgl/WebGLBufferRenderer',
				'WebGLCapabilities': 'src/renderers/webgl/WebGLCapabilities',
				'WebGLCapabilitiesParameters': 'src/renderers/webgl/WebGLCapabilities',
				'WebGLClipping': 'src/renderers/webgl/WebGLClipping',
				'WebGLExtensions': 'src/renderers/webgl/WebGLExtensions',
				'WebGLGeometries': 'src/renderers/webgl/WebGLGeometries',
				'WebGLIndexedBufferRenderer': 'src/renderers/webgl/WebGLIndexedBufferRenderer',
				'WebGLInfo': 'src/renderers/webgl/WebGLInfo',
				'WebGLLights': 'src/renderers/webgl/WebGLLights',
				'WebGLObjects': 'src/renderers/webgl/WebGLObjects',
				'WebGLProgram': 'src/renderers/webgl/WebGLProgram',
				'WebGLPrograms': 'src/renderers/webgl/WebGLPrograms',
				'WebGLProperties': 'src/renderers/webgl/WebGLProperties',
				'RenderItem': 'src/renderers/webgl/WebGLRenderLists',
				'RenderTarget': 'src/renderers/webgl/WebGLRenderLists',
				'WebGLRenderList': 'src/renderers/webgl/WebGLRenderLists',
				'WebGLRenderLists': 'src/renderers/webgl/WebGLRenderLists',
				'WebGLShader': 'src/renderers/webgl/WebGLShader',
				'WebGLShadowMap': 'src/renderers/webgl/WebGLShadowMap',
				'WebGLColorBuffer': 'src/renderers/webgl/WebGLState',
				'WebGLDepthBuffer': 'src/renderers/webgl/WebGLState',
				'WebGLState': 'src/renderers/webgl/WebGLState',
				'WebGLStencilBuffer': 'src/renderers/webgl/WebGLState',
				'WebGLTextures': 'src/renderers/webgl/WebGLTextures',
				'WebGLUniforms': 'src/renderers/webgl/WebGLUniforms',
				'Renderer': 'src/renderers/WebGLRenderer',
				'WebGLDebug': 'src/renderers/WebGLRenderer',
				'WebGLRendererParameters': 'src/renderers/WebGLRenderer',
				'WebGLRenderTargetOptions': 'src/renderers/WebGLRenderTarget',
				'IFog': 'src/scenes/Fog',
				'TextureIdCount': 'src/textures/Texture'
			}
		};

		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(1)' ).as( 'javascript-symbols-column' );
		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(2)' ).as( 'javascript-files-column' );

		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(1)' ).as( 'typescript-symbols-column' );
		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(2)' ).as( 'typescript-files-column' );

		cy.get( '@javascript-symbols-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@javascript-files-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@typescript-symbols-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );
		cy.get( '@typescript-files-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );

		// this way, i.e. jQuery, seems to be quite a bit faster than doing it via cypress
		cy.get( '@javascript-symbols-column' ).then( cells => {

			Object.keys( results.JavaScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@javascript-files-column' ).then( cells => {

			Object.values( results.JavaScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

		cy.get( '@typescript-symbols-column' ).then( cells => {

			Object.keys( results.TypeScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@typescript-files-column' ).then( cells => {

			Object.values( results.TypeScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

	} );

	it( 'checks/DocsDecl (36524a4c…)', () => {

		const results = {
			properties: {
				both: [
					'DefaultInterpolation',
					'THREE.InterpolationModes vs. Constant'
				],
				declaration: [
					'ValueTypeName',
					'TimeBufferType',
					'ValueBufferType'
				],
				docs: [
					'TimeBufferType',
					'ValueBufferType'
				]
			},
			methods: {
				both: [
					'getInterpolation',
					'THREE.InterpolationModes vs. null',
					'InterpolantFactoryMethodLinear',
					'THREE.LinearInterpolant vs. null',
					'InterpolantFactoryMethodSmooth',
					'THREE.CubicInterpolant vs. null'
				],
				declaration: [],
				docs: [
					'createInterpolant',
					'parse'
				]
			}
		};

		cy.visit( '/#/runs/1/checks/DocsDecl' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 179 );
		cy.get( '[data-cy=files-list-item].bg-danger' ).should( 'have.length', 17 );

		// errors
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/Polyfills.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2FPolyfills.html/i );
		cy.get( '[data-cy=warning-error-members-alert]' ).should( 'be.visible' );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/animation/KeyframeTrack.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Fanimation%2FKeyframeTrack.html/i );
		cy.get( '[data-cy=warning-error-members-alert]' ).should( 'not.be.visible' );

		cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).as( 'properties-data-columns' );
		cy.get( '[data-cy=methods-table] [data-cy=data-column]' ).as( 'methods-data-columns' );

		for ( const decl of [ ...results.properties.both, ...results.properties.declaration, ...results.properties.docs ] )
			cy.get( '@properties-data-columns' ).should( 'contain.text', decl );

		for ( const method of [ ...results.methods.both, ...results.methods.declaration, ...results.methods.docs ] )
			cy.get( '@methods-data-columns' ).should( 'contain.text', method );

	} );

	it( 'checks/ObjDecl (36524a4c…)', () => {

		const results = {
			'declaration': [
				'customDepthMaterial',
				'customDistanceMaterial'
			],
			'object': [
				'applyMatrix',
				'eulerOrder',
				'getChildByName',
				'getWorldRotation',
				'isImmediateRenderObject',
				'renderDepth',
				'translate',
				'useQuaternion'
			]
		};

		cy.visit( '/#/runs/1/checks/ObjDecl' );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 141 );

		cy.get( '[data-cy=files-list-item]' ).contains( 'src/geometries/TextGeometry.d.ts' ).parent( 'button' ).should( 'have.class', 'bg-danger' );

		cy.get( '[data-cy=files-list-item]' ).contains( 'src/extras/objects/ImmediateRenderObject.d.ts' ).should( 'have.length', 1 ).click();

		cy.url().should( 'match', /src%2Fextras%2Fobjects%2FImmediateRenderObject.d.ts/i );

		cy.get( '[data-cy=properties-table]' ).should( 'be.visible' );

		for ( const decl of results.declaration )
			cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', decl );

		for ( const src of results.object )
			cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', src );

		cy.get( 'span.badge-warning' ).should( 'have.length', 8 );

	} );

	it( 'checks/DocsExamples (36524a4c…)', () => {

		// TODO: cy.fixtures

		const filenames = [
			'docs/api/en/extras/core/Curve.html',
			'docs/api/en/geometries/TextGeometry.html',
			'docs/api/en/loaders/Cache.html',
			'docs/api/en/materials/LineBasicMaterial.html',
			'docs/api/en/materials/Material.html',
			'docs/api/en/materials/PointsMaterial.html',
			'docs/api/en/materials/RawShaderMaterial.html',
			'docs/api/en/materials/ShaderMaterial.html',
			'docs/api/en/materials/SpriteMaterial.html',
			'docs/api/zh/animation/AnimationAction.html',
			'docs/api/zh/cameras/CubeCamera.html',
			'docs/api/zh/core/BufferGeometry.html',
			'docs/api/zh/core/Geometry.html',
			'docs/api/zh/extras/core/Curve.html',
			'docs/api/zh/geometries/DodecahedronGeometry.html',
			'docs/api/zh/loaders/Cache.html',
			'docs/api/zh/loaders/CubeTextureLoader.html',
			'docs/api/zh/materials/LineBasicMaterial.html',
			'docs/api/zh/materials/Material.html',
			'docs/api/zh/materials/PointsMaterial.html',
			'docs/api/zh/materials/RawShaderMaterial.html',
			'docs/api/zh/materials/ShaderMaterial.html',
			'docs/api/zh/materials/SpriteMaterial.html',
			'docs/api/zh/math/Color.html',
			'docs/examples/en/animations/CCDIKSolver.html',
			'docs/examples/en/loaders/MTLLoader.html',
			'docs/examples/en/loaders/OBJLoader2.html',
			'docs/examples/zh/animations/CCDIKSolver.html',
			'docs/examples/zh/loaders/MTLLoader.html',
			'docs/examples/zh/loaders/OBJLoader2.html',
			'docs/manual/en/introduction/Useful-links.html',
			'docs/manual/zh/introduction/Matrix-transformations.html',
			'docs/manual/zh/introduction/Useful-links.html'
		];

		const results = [
			'Errors:',
			'Error:',
			'webgl_interactive_instances_gpu',
			'webgl_buffergeometry_drawcalls',
			'webgl_materials_transparency',
			'webgl_buffergeometry_drawcalls',
			'webgl_buffergeometry_instancing_dynamic, webgl_buffergeometry_instancing_interleaved_dynamic, webgl_interactive_instances_gpu',
			'webgl_hdr, webgl_materials_bumpmap_skin, webgl_materials_skin',
			'software_sandbox',
			'Error:',
			'webgl_materials_cubemap_dynamic2',
			'Errors:',
			'webgl_morphnormals',
			'Errors:',
			'Error:',
			'webgl_interactive_instances_gpu',
			'webgl_materials_cubemap_dynamic2',
			'webgl_buffergeometry_drawcalls',
			'webgl_materials_transparency',
			'webgl_buffergeometry_drawcalls',
			'webgl_buffergeometry_instancing_dynamic, webgl_buffergeometry_instancing_interleaved_dynamic, webgl_interactive_instances_gpu',
			'webgl_hdr, webgl_materials_bumpmap_skin, webgl_materials_skin, webgl_materials_texture_hdr',
			'software_sandbox',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:'
		];

		cy.visit( '/#/runs/1/checks/DocsExamples' );

		cy.get( 'table > tbody' ).children()
			.then( $kids => {

				expect( $kids ).to.be.of.length( 33, 'Correct length' );

				filenames.forEach( ( name, index ) => {

					expect( $kids[ index ].children[ 0 ] ).to.contain.text( name, `Found file: ${name}` );
					expect( $kids[ index ].children[ 1 ] ).to.contain.text( results[ index ], `Found result: ${results[ index ]}` );

				} );

			} );

	} );

	it( 'checks/DocsExternals (36524a4c…)', () => {

		const results = {
			'docs/api/en/extras/core/Curve.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 82)`,
			'docs/api/en/geometries/TextGeometry.html': `Error: Expected " ", "]", or [a-zA-Z0-9_.] but "-" found. (line 18)`,
			'docs/api/en/math/Quaternion.html': `http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors`,
			'docs/api/en/Template.html': `https://github.com/mrdoob/three.js/blob/master/src/Template.js`,
			'docs/api/zh/animation/AnimationAction.html': `Error: Expected [ \\t\\r\\n] or [a-zA-Z0-9_.] but "重" found. (line 271)`,
			'docs/api/zh/core/BufferGeometry.html': `Error: Expected " " or [a-zA-Z0-9_.] but "]" found. (line 184)`,
			'docs/api/zh/extras/core/Curve.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 82)`,
			'docs/api/zh/geometries/DodecahedronGeometry.html': `Error: Expected " ", ".js", "[", "]", [:/\\-()#=], [:/\\-], or [a-zA-Z0-9_.] but "\\n" found. (line 57)`,
			'docs/api/zh/materials/Material.html': `Error: Expected " ", "]", or [a-zA-Z0-9_.] but "\\n" found. (line 52)`,
			'docs/api/zh/math/Color.html': `Error: Expected "." or [a-zA-Z0-9_.] but " " found. (line 220)`,
			'docs/api/zh/math/Quaternion.html': `http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors`,
			'docs/api/zh/Template.html': `https://github.com/mrdoob/three.js/blob/master/src/Template.js`,
			'docs/examples/en/animations/CCDIKSolver.html': `Error: Expected "." or [a-zA-Z0-9_.] but " " found. (line 61)`,
			'docs/examples/en/loaders/MTLLoader.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 63)`,
			'docs/examples/en/loaders/OBJLoader2.html': `Error: Expected "]", [ \\t\\r\\n], or [a-zA-Z0-9_.] but "-" found. (line 140)`,
			'docs/examples/en/math/Lut.html': `https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/en/math/Lut.js`,
			'docs/examples/zh/animations/CCDIKSolver.html': `Error: Expected "." or [a-zA-Z0-9_.] but " " found. (line 61)`,
			'docs/examples/zh/loaders/MTLLoader.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 63)`,
			'docs/examples/zh/loaders/OBJLoader2.html': `Error: Expected "]", [ \\t\\r\\n], or [a-zA-Z0-9_.] but "-" found. (line 140)`,
			'docs/examples/zh/math/Lut.html': `https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/zh/math/Lut.js`,
			'docs/manual/en/buildTools/Testing-with-NPM.html': `https://www.npmjs.org/doc/json.html`,
			'docs/manual/en/introduction/How-to-run-things-locally.html': `http://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration`,
			'docs/manual/en/introduction/Useful-links.html': `Error: Expected " ", ".js", "[", "]", [:/\\-()#=], [:/\\-], or [a-zA-Z0-9_.] but "?" found. (line 127)`,
			'docs/manual/zh/introduction/How-to-run-things-locally.html': `http://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration`,
			'docs/manual/zh/introduction/Matrix-transformations.html': `Error: Expected "]", [ \\t\\r\\n], or [a-zA-Z0-9_.] but "(" found. (line 57)`,
			'docs/manual/zh/introduction/Useful-links.html': `Error: Expected " ", ".js", "[", "]", [:/\\-()#=], [:/\\-], or [a-zA-Z0-9_.] but "?" found. (line 128)`
		};

		cy.visit( '/#/runs/1/checks/DocsExternals' );

		cy.get( 'table > tbody' ).children()
			.then( $kids => {

				expect( $kids ).to.be.of.length( Object.keys( results ).length, 'Correct length' );

				Object.entries( results ).forEach( ( [ name, text ], index ) => {

					expect( $kids[ index ].children[ 0 ] ).to.be.text( name, `Found file: ${name}` );
					expect( $kids[ index ].children[ 1 ] ).to.be.text( text, `Found result: ${text}` );

				} );

			} );

	} );

	it( 'checks/NonDocsExternals (36524a4c…)', () => {

		const results = {
			'examples/js/libs/chevrotain.min.js': 'https://unpkg.com/chevrotain@',
			'examples/jsm/libs/chevrotain.module.min.js': 'https://unpkg.com/chevrotain@',
			'examples/jsm/webxr/XRControllerModelFactory.js': 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles',
			'examples/webgl_animation_keyframes.html': 'https://www.artstation.com/artwork/1AGwX',
			'examples/webgl_geometry_extrude_splines.html': 'http://www.lab4games.net/zz85/blog',
			'examples/webgl_geometry_text.html': 'http://www.lab4games.net/zz85/blog',
			'examples/webgl_lensflares.html': 'http://ro.me',
			'examples/webgl_lights_hemisphere.html': 'http://ro.me',
			'examples/webgl_lights_pointlights.html': 'http://davidoreilly.com/post/18087489343/disneyhead',
			'examples/webgl_lines_colors.html': 'http://www.openprocessing.org/visuals/?visualID=15599',
			'examples/webgl_loader_amf.html': 'https://github.com/tamarintech',
			'examples/webgl_loader_assimp.html': 'https://virtulo.us',
			'examples/webgl_loader_md2_control.html': 'http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=556',
			'examples/webgl_loader_md2.html': 'http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=368',
			'examples/webgl_loader_pcd.html': 'http://filipecaixeta.com.br',
			'examples/webgl_loader_ply.html': 'http://people.sc.fsu.edu/~jburkardt/data/ply/ply.html',
			'examples/webgl_materials_bumpmap.html': 'http://graphics.cs.williams.edu/data/meshes.xml#14',
			'examples/webgl_materials_cubemap.html': 'http://davidoreilly.com/post/18087489343/disneyhead',
			'examples/webgl_materials_envmaps.html': 'http://gl.ict.usc.edu/Data/HighResProbes/',
			'examples/webgl_materials_modified.html': 'http://graphics.cs.williams.edu/data/meshes.xml#14',
			'examples/webgl_materials_normalmap.html': 'http://graphics.cs.williams.edu/data/meshes.xml#14',
			'examples/webgl_materials_parallaxmap.html': 'http://sunandblackcat.com/tipFullView.php?topicid=28',
			'examples/webgl_materials_standard.html': 'http://www.polycount.com/forum/showthread.php?t=130641',
			'examples/webgl_morphtargets_horse.html': 'http://ro.me',
			'examples/webgl_postprocessing_advanced.html': 'http://g3d.cs.williams.edu/g3d/data10/index.html#mesh19',
			'examples/webgl_shadowmap_performance.html': 'http://ro.me',
			'examples/webgl_shadowmap.html': 'http://ro.me',
			'examples/webgl_skinning_simple.html': 'https://github.com/mrdoob/three.js/blob/master/examples/models/skinned/simple/simple.blend',
			'src/math/MathUtils.d.ts': 'https://github.com/mrdoob/three.js/blob/master/src/math/Math.js',
			'src/objects/Points.d.ts': 'https://github.com/mrdoob/three.js/blob/master/src/objects/ParticleSystem.js',
		};

		cy.visit( '/#/runs/1/checks/NonDocsExternals' );

		cy.get( 'table > tbody' ).children()
			.then( $kids => {

				expect( $kids ).to.be.of.length( Object.keys( results ).length, 'Correct length' );

				Object.entries( results ).forEach( ( [ name, text ], index ) => {

					expect( $kids[ index ].children[ 0 ] ).to.be.text( name, `Found file: ${name}` );
					expect( $kids[ index ].children[ 1 ] ).to.be.text( text, `Found result: ${text}` );

				} );

			} );

	} );

	it( 'checks/SrcDecl (36524a4c…)', () => {

		const results = {
			'src/renderers/shaders/ShaderChunk.js': {
				'declaration': [
					'lights_pars_map',
					'normal_flip'
				],
				'source': [
					'fog_vertex',
					'fog_pars_vertex',
					'gradientmap_pars_fragment',
					'lights_toon_fragment',
					'lights_toon_pars_fragment',
					'dithering_fragment',
					'dithering_pars_fragment',
					'background_frag',
					'background_vert',
					'meshmatcap_frag',
					'meshmatcap_vert',
					'meshtoon_frag',
					'meshtoon_vert',
					'sprite_frag',
					'sprite_vert'
				]
			},
			'src/renderers/shaders/ShaderLib.js': {
				'declaration': [],
				'source': [
					'toon'
				]
			},
			'src/renderers/shaders/UniformsLib.js': {
				'declaration': [
					'lights.hemisphereLights.properties.skycolor'
				],
				'source': [
					'lights.lightProbe.value',
					'lights.pointLightShadows.properties.shadowCameraNear',
					'lights.pointLightShadows.properties.shadowCameraFar',
					'lights.hemisphereLights.properties.skyColor',
					'points.alphaMap.value',
					'sprite.diffuse.value',
					'sprite.opacity.value',
					'sprite.center.value',
					'sprite.rotation.value',
					'sprite.map.value',
					'sprite.alphaMap.value',
					'sprite.uvTransform.value'
				]
			}
		};

		cy.visit( '/#/runs/1/checks/SrcDecl' );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', Object.keys( results ).length );

		for ( const filename of Object.keys( results ) ) {

			cy.get( '[data-cy=files-list-item-text]' )
				.contains( filename )
				.should( 'have.length', 1 )
				.click();
			// .then( $el => expect( $el.parent() ).to.have.class( 'active' ) );

			cy.get( '[data-cy=properties-table]' ).should( 'be.visible' );

			for ( const decl of results[ filename ].declaration )
				cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', decl );

			for ( const src of results[ filename ].source )
				cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', src );

		}

	} );

	it( 'checks/ScanCompletion (36524a4c…)', () => {

		cy.visit( '/#/runs/1/checks/ScanCompletion' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/TSCompiler (36524a4c…)', () => {

		cy.visit( '/#/runs/1/checks/TSCompiler' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/UnitTests (36524a4c…)', () => {

		cy.visit( '/#/runs/1/checks/UnitTests' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/LawVsReality (36524a4c…)', () => {

		cy.visit( '/#/runs/1/checks/LawVsReality' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/CompExmplsExp (1908f394……)', () => {

		cy.visit( '/#/runs/2/checks/CompExmplsExp' );

		const results = {
			JavaScript: {
				'CameraControls': 'examples/jsm/controls/experimental/CameraControls',
				'TransformControlsGizmo': 'examples/jsm/controls/TransformControls',
				'TransformControlsPlane': 'examples/jsm/controls/TransformControls',
				'CSM': 'examples/jsm/csm/CSM',
				'CSMHelper': 'examples/jsm/csm/CSMHelper',
				'default': 'examples/jsm/csm/Frustum',
				'__object': 'examples/jsm/csm/Shader',
				'NodeMaterialLoader': 'examples/jsm/loaders/NodeMaterialLoader',
				'NodeMaterialLoaderUtils': 'examples/jsm/loaders/NodeMaterialLoader',
				'LoadedMeshUserOverride': 'examples/jsm/loaders/obj2/shared/MeshReceiver',
				'SubSlotNode': 'examples/jsm/nodes/utils/SubSlotNode',
				'initJank': 'examples/jsm/offscreen/jank',
				'init': 'examples/jsm/offscreen/scene',
				'CannonPhysics': 'examples/jsm/physics/CannonPhysics',
				'ACESFilmicToneMappingShader': 'examples/jsm/shaders/ACESFilmicToneMappingShader',
				'FlakesTexture': 'examples/jsm/textures/FlakesTexture',
				'PackedPhongMaterial': 'examples/jsm/utils/GeometryCompressionUtils'
			},
			TypeScript: {
				'CCDIKHelper': 'examples/jsm/animation/CCDIKSolver',
				'IKS': 'examples/jsm/animation/CCDIKSolver',
				'AudioManager': 'examples/jsm/animation/MMDAnimationHelper',
				'AudioManagerParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'GrantSolver': 'examples/jsm/animation/MMDAnimationHelper',
				'MMDAnimationHelperAddParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'MMDAnimationHelperParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'MMDAnimationHelperPoseParameter': 'examples/jsm/animation/MMDAnimationHelper',
				'Constraint': 'examples/jsm/animation/MMDPhysics',
				'MMDPhysicsHelper': 'examples/jsm/animation/MMDPhysics',
				'MMDPhysicsParameter': 'examples/jsm/animation/MMDPhysics',
				'ResourceManager': 'examples/jsm/animation/MMDPhysics',
				'RigidBody': 'examples/jsm/animation/MMDPhysics',
				'AsciiEffectOptions': 'examples/jsm/effects/AsciiEffect',
				'OutlineEffectParameters': 'examples/jsm/effects/OutlineEffect',
				'ColladaExporterOptions': 'examples/jsm/exporters/ColladaExporter',
				'ColladaExporterResult': 'examples/jsm/exporters/ColladaExporter',
				'DRACOExporterOptions': 'examples/jsm/exporters/DRACOExporter',
				'GLTFExporterOptions': 'examples/jsm/exporters/GLTFExporter',
				'PLYExporterOptions': 'examples/jsm/exporters/PLYExporter',
				'STLExporterOptions': 'examples/jsm/exporters/STLExporter',
				'LightningSegment': 'examples/jsm/geometries/LightningStrike',
				'LightningSubray': 'examples/jsm/geometries/LightningStrike',
				'RandomGenerator': 'examples/jsm/geometries/LightningStrike',
				'RayParameters': 'examples/jsm/geometries/LightningStrike',
				'LineMaterialParameters': 'examples/jsm/lines/LineMaterial',
				'Assimp': 'examples/jsm/loaders/AssimpLoader',
				'BVH': 'examples/jsm/loaders/BVHLoader',
				'Collada': 'examples/jsm/loaders/ColladaLoader',
				'DDS': 'examples/jsm/loaders/DDSLoader',
				'EXR': 'examples/jsm/loaders/EXRLoader',
				'GLTF': 'examples/jsm/loaders/GLTFLoader',
				'GLTFParser': 'examples/jsm/loaders/GLTFLoader',
				'KTX': 'examples/jsm/loaders/KTXLoader',
				'LWO': 'examples/jsm/loaders/LWOLoader',
				'LWOLoaderParameters': 'examples/jsm/loaders/LWOLoader',
				'MDD': 'examples/jsm/loaders/MDDLoader',
				'MMDLoaderAnimationObject': 'examples/jsm/loaders/MMDLoader',
				'MaterialCreatorOptions': 'examples/jsm/loaders/MTLLoader',
				'MaterialInfo': 'examples/jsm/loaders/MTLLoader',
				'TexParams': 'examples/jsm/loaders/MTLLoader',
				'PDB': 'examples/jsm/loaders/PDBLoader',
				'PVR': 'examples/jsm/loaders/PVRLoader',
				'RGBE': 'examples/jsm/loaders/RGBELoader',
				'SVGResult': 'examples/jsm/loaders/SVGLoader',
				'StrokeStyle': 'examples/jsm/loaders/SVGLoader',
				'XResult': 'examples/jsm/loaders/XLoader',
				'CMYK': 'examples/jsm/math/ColorConverter',
				'HSL': 'examples/jsm/math/ColorConverter',
				'Face': 'examples/jsm/math/ConvexHull',
				'HalfEdge': 'examples/jsm/math/ConvexHull',
				'VertexList': 'examples/jsm/math/ConvexHull',
				'VertexNode': 'examples/jsm/math/ConvexHull',
				'CutByPlaneOutput': 'examples/jsm/misc/ConvexObjectBreaker',
				'Variable': 'examples/jsm/misc/GPUComputationRenderer',
				'MD2PartsConfig': 'examples/jsm/misc/MD2Character',
				'FunctionNodeInput': 'examples/jsm/nodes/core/FunctionNode',
				'NodeLibKeyword': 'examples/jsm/nodes/core/NodeLib',
				'NodeUniformParams': 'examples/jsm/nodes/core/NodeUniform',
				'StructNodeInput': 'examples/jsm/nodes/core/StructNode',
				'TempNodeParams': 'examples/jsm/nodes/core/TempNode',
				'RTTNodeOptions': 'examples/jsm/nodes/inputs/RTTNode',
				'NodeMaterialBuildParams': 'examples/jsm/nodes/materials/NodeMaterial',
				'SubSlots': 'examples/jsm/nodes/utils/SubSlot',
				'VelocityNodeParams': 'examples/jsm/nodes/utils/VelocityNode',
				'ColorShader': 'examples/jsm/objects/Fire',
				'DebugShader': 'examples/jsm/objects/Fire',
				'DiffuseShader': 'examples/jsm/objects/Fire',
				'DriftShader': 'examples/jsm/objects/Fire',
				'FireOptions': 'examples/jsm/objects/Fire',
				'ProjectionShader1': 'examples/jsm/objects/Fire',
				'ProjectionShader2': 'examples/jsm/objects/Fire',
				'ProjectionShader3': 'examples/jsm/objects/Fire',
				'SourceShader': 'examples/jsm/objects/Fire',
				'StormParams': 'examples/jsm/objects/LightningStorm',
				'ReflectorOptions': 'examples/jsm/objects/Reflector',
				'RefractorOptions': 'examples/jsm/objects/Refractor',
				'WaterOptions': 'examples/jsm/objects/Water2',
				'BokehPassParamters': 'examples/jsm/postprocessing/BokehPass',
				'HalftonePassParameters': 'examples/jsm/postprocessing/HalftonePass',
				'SAOPassParams': 'examples/jsm/postprocessing/SAOPass',
				'XRControllerModel': 'examples/jsm/webxr/XRControllerModelFactory'
			}
		};

		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(1)' ).as( 'javascript-symbols-column' );
		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(2)' ).as( 'javascript-files-column' );

		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(1)' ).as( 'typescript-symbols-column' );
		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(2)' ).as( 'typescript-files-column' );

		cy.get( '@javascript-symbols-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@javascript-files-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@typescript-symbols-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );
		cy.get( '@typescript-files-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );

		// this way, i.e. jQuery, seems to be quite a bit faster than doing it via cypress
		cy.get( '@javascript-symbols-column' ).then( cells => {

			Object.keys( results.JavaScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@javascript-files-column' ).then( cells => {

			Object.values( results.JavaScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

		cy.get( '@typescript-symbols-column' ).then( cells => {

			Object.keys( results.TypeScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@typescript-files-column' ).then( cells => {

			Object.values( results.TypeScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

	} );

	it( 'checks/CompSrcExp (1908f394……)', () => {

		cy.visit( '/#/runs/2/checks/CompSrcExp' );

		const results = {
			JavaScript: {
				'WebGLUtils': 'src/renderers/webgl/WebGLUtils',
				'DataTexture2DArray': 'src/textures/DataTexture2DArray'
			},
			TypeScript: {
				'AnimationAction': 'src/animation/AnimationAction',
				'ParseTrackNameResults': 'src/animation/PropertyBinding',
				'DirectGeometry': 'src/core/DirectGeometry',
				'Event': 'src/core/EventDispatcher',
				'GeometryIdCount': 'src/core/Geometry',
				'MorphColor': 'src/core/Geometry',
				'MorphNormals': 'src/core/Geometry',
				'MorphTarget': 'src/core/Geometry',
				'BufferGeometryUtils': 'src/core/InstancedBufferAttribute',
				'GeometryUtils': 'src/core/InstancedBufferAttribute',
				'Object3DIdCount': 'src/core/Object3D',
				'Intersection': 'src/core/Raycaster',
				'RaycasterParameters': 'src/core/Raycaster',
				'Vec2': 'src/extras/ShapeUtils',
				'HSL': 'src/math/Color',
				'Matrix': 'src/math/Matrix3',
				'SplineControlPoint': 'src/math/Triangle',
				'Vector': 'src/math/Vector2',
				'LinePieces': 'src/objects/LineSegments',
				'LineStrip': 'src/objects/LineSegments',
				'Shader': 'src/renderers/shaders/ShaderLib',
				'IUniform': 'src/renderers/shaders/UniformsLib',
				'cloneUniforms': 'src/renderers/shaders/UniformsUtils',
				'mergeUniforms': 'src/renderers/shaders/UniformsUtils',
				'WebGLBufferRenderer': 'src/renderers/webgl/WebGLBufferRenderer',
				'WebGLCapabilities': 'src/renderers/webgl/WebGLCapabilities',
				'WebGLCapabilitiesParameters': 'src/renderers/webgl/WebGLCapabilities',
				'WebGLClipping': 'src/renderers/webgl/WebGLClipping',
				'WebGLExtensions': 'src/renderers/webgl/WebGLExtensions',
				'WebGLGeometries': 'src/renderers/webgl/WebGLGeometries',
				'WebGLIndexedBufferRenderer': 'src/renderers/webgl/WebGLIndexedBufferRenderer',
				'WebGLInfo': 'src/renderers/webgl/WebGLInfo',
				'WebGLLights': 'src/renderers/webgl/WebGLLights',
				'WebGLObjects': 'src/renderers/webgl/WebGLObjects',
				'WebGLProgram': 'src/renderers/webgl/WebGLProgram',
				'WebGLPrograms': 'src/renderers/webgl/WebGLPrograms',
				'WebGLProperties': 'src/renderers/webgl/WebGLProperties',
				'RenderItem': 'src/renderers/webgl/WebGLRenderLists',
				'RenderTarget': 'src/renderers/webgl/WebGLRenderLists',
				'WebGLRenderList': 'src/renderers/webgl/WebGLRenderLists',
				'WebGLRenderLists': 'src/renderers/webgl/WebGLRenderLists',
				'WebGLShader': 'src/renderers/webgl/WebGLShader',
				'WebGLShadowMap': 'src/renderers/webgl/WebGLShadowMap',
				'WebGLColorBuffer': 'src/renderers/webgl/WebGLState',
				'WebGLDepthBuffer': 'src/renderers/webgl/WebGLState',
				'WebGLState': 'src/renderers/webgl/WebGLState',
				'WebGLStencilBuffer': 'src/renderers/webgl/WebGLState',
				'WebGLTextures': 'src/renderers/webgl/WebGLTextures',
				'WebGLUniforms': 'src/renderers/webgl/WebGLUniforms',
				'Renderer': 'src/renderers/WebGLRenderer',
				'WebGLDebug': 'src/renderers/WebGLRenderer',
				'WebGLRendererParameters': 'src/renderers/WebGLRenderer',
				'WebGLRenderTargetOptions': 'src/renderers/WebGLRenderTarget',
				'IFog': 'src/scenes/Fog',
				'TextureIdCount': 'src/textures/Texture'
			}
		};

		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(1)' ).as( 'javascript-symbols-column' );
		cy.get( '[data-cy=table-javascript] > tbody > tr > :nth-child(2)' ).as( 'javascript-files-column' );

		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(1)' ).as( 'typescript-symbols-column' );
		cy.get( '[data-cy=table-typescript] > tbody > tr > :nth-child(2)' ).as( 'typescript-files-column' );

		cy.get( '@javascript-symbols-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@javascript-files-column' ).should( 'have.length', Object.keys( results.JavaScript ).length );
		cy.get( '@typescript-symbols-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );
		cy.get( '@typescript-files-column' ).should( 'have.length', Object.keys( results.TypeScript ).length );

		// this way, i.e. jQuery, seems to be quite a bit faster than doing it via cypress
		cy.get( '@javascript-symbols-column' ).then( cells => {

			Object.keys( results.JavaScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@javascript-files-column' ).then( cells => {

			Object.values( results.JavaScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

		cy.get( '@typescript-symbols-column' ).then( cells => {

			Object.keys( results.TypeScript ).forEach( ( name, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( name );

			} );

		} );

		cy.get( '@typescript-files-column' ).then( cells => {

			Object.values( results.TypeScript ).forEach( ( file, index ) => {

				expect( cells.eq( index ).text() ).to.be.equal( file );

			} );

		} );

	} );

	it( 'checks/DocsDecl (1908f394……)', () => {

		const results = {
			properties: {
				both: [
					'DefaultInterpolation',
					'THREE.InterpolationModes vs. Constant'
				],
				declaration: [
					'ValueTypeName',
					'TimeBufferType',
					'ValueBufferType'
				],
				docs: [
					'TimeBufferType',
					'ValueBufferType'
				]
			},
			methods: {
				both: [
					'getInterpolation',
					'THREE.InterpolationModes vs. null',
					'InterpolantFactoryMethodLinear',
					'THREE.LinearInterpolant vs. null',
					'InterpolantFactoryMethodSmooth',
					'THREE.CubicInterpolant vs. null'
				],
				declaration: [],
				docs: [
					'createInterpolant',
					'parse'
				]
			}
		};

		cy.visit( '/#/runs/2/checks/DocsDecl' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 179 );
		cy.get( '[data-cy=files-list-item].bg-danger' ).should( 'have.length', 17 );

		// errors
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/Polyfills.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2FPolyfills.html/i );
		cy.get( '[data-cy=warning-error-members-alert]' ).should( 'be.visible' );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/animation/KeyframeTrack.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Fanimation%2FKeyframeTrack.html/i );
		cy.get( '[data-cy=warning-error-members-alert]' ).should( 'not.be.visible' );

		cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).as( 'properties-data-columns' );
		cy.get( '[data-cy=methods-table] [data-cy=data-column]' ).as( 'methods-data-columns' );

		for ( const decl of [ ...results.properties.both, ...results.properties.declaration, ...results.properties.docs ] )
			cy.get( '@properties-data-columns' ).should( 'contain.text', decl );

		for ( const method of [ ...results.methods.both, ...results.methods.declaration, ...results.methods.docs ] )
			cy.get( '@methods-data-columns' ).should( 'contain.text', method );

	} );

	it( 'checks/ObjDecl (1908f394……)', () => {

		const results = {
			'declaration': [
				'customDepthMaterial',
				'customDistanceMaterial'
			],
			'object': [
				'applyMatrix',
				'eulerOrder',
				'getChildByName',
				'getWorldRotation',
				'isImmediateRenderObject',
				'renderDepth',
				'translate',
				'useQuaternion'
			]
		};

		cy.visit( '/#/runs/2/checks/ObjDecl' );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 141 );

		cy.get( '[data-cy=files-list-item]' ).contains( 'src/geometries/TextGeometry.d.ts' ).parent( 'button' ).should( 'have.class', 'bg-danger' );

		cy.get( '[data-cy=files-list-item]' ).contains( 'src/extras/objects/ImmediateRenderObject.d.ts' ).should( 'have.length', 1 ).click();

		cy.url().should( 'match', /src%2Fextras%2Fobjects%2FImmediateRenderObject.d.ts/i );

		cy.get( '[data-cy=properties-table]' ).should( 'be.visible' );

		for ( const decl of results.declaration )
			cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', decl );

		for ( const src of results.object )
			cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', src );

		cy.get( 'span.badge-warning' ).should( 'have.length', 8 );

	} );

	it( 'checks/DocsExamples (1908f394……)', () => {

		// TODO: cy.fixtures

		const filenames = [
			'docs/api/en/extras/core/Curve.html',
			'docs/api/en/geometries/TextGeometry.html',
			'docs/api/en/loaders/Cache.html',
			'docs/api/en/materials/LineBasicMaterial.html',
			'docs/api/en/materials/Material.html',
			'docs/api/en/materials/PointsMaterial.html',
			'docs/api/en/materials/RawShaderMaterial.html',
			'docs/api/en/materials/ShaderMaterial.html',
			'docs/api/en/materials/SpriteMaterial.html',
			'docs/api/zh/animation/AnimationAction.html',
			'docs/api/zh/cameras/CubeCamera.html',
			'docs/api/zh/core/BufferGeometry.html',
			'docs/api/zh/core/Geometry.html',
			'docs/api/zh/extras/core/Curve.html',
			'docs/api/zh/geometries/DodecahedronGeometry.html',
			'docs/api/zh/loaders/Cache.html',
			'docs/api/zh/loaders/CubeTextureLoader.html',
			'docs/api/zh/materials/LineBasicMaterial.html',
			'docs/api/zh/materials/Material.html',
			'docs/api/zh/materials/PointsMaterial.html',
			'docs/api/zh/materials/RawShaderMaterial.html',
			'docs/api/zh/materials/ShaderMaterial.html',
			'docs/api/zh/materials/SpriteMaterial.html',
			'docs/api/zh/math/Color.html',
			'docs/examples/en/animations/CCDIKSolver.html',
			'docs/examples/en/loaders/MTLLoader.html',
			'docs/examples/en/loaders/OBJLoader2.html',
			'docs/examples/zh/animations/CCDIKSolver.html',
			'docs/examples/zh/loaders/MTLLoader.html',
			'docs/examples/zh/loaders/OBJLoader2.html',
			'docs/manual/en/introduction/Useful-links.html',
			'docs/manual/zh/introduction/Matrix-transformations.html',
			'docs/manual/zh/introduction/Useful-links.html'
		];

		const results = [
			'Errors:',
			'Error:',
			'webgl_interactive_instances_gpu',
			'webgl_buffergeometry_drawcalls',
			'webgl_materials_transparency',
			'webgl_buffergeometry_drawcalls',
			'webgl_buffergeometry_instancing_dynamic, webgl_buffergeometry_instancing_interleaved_dynamic, webgl_interactive_instances_gpu',
			'webgl_hdr, webgl_materials_bumpmap_skin, webgl_materials_skin',
			'software_sandbox',
			'Error:',
			'webgl_materials_cubemap_dynamic2',
			'Errors:',
			'webgl_morphnormals',
			'Errors:',
			'Error:',
			'webgl_interactive_instances_gpu',
			'webgl_materials_cubemap_dynamic2',
			'webgl_buffergeometry_drawcalls',
			'webgl_materials_transparency',
			'webgl_buffergeometry_drawcalls',
			'webgl_buffergeometry_instancing_dynamic, webgl_buffergeometry_instancing_interleaved_dynamic, webgl_interactive_instances_gpu',
			'webgl_hdr, webgl_materials_bumpmap_skin, webgl_materials_skin, webgl_materials_texture_hdr',
			'software_sandbox',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:',
			'Error:'
		];

		cy.visit( '/#/runs/2/checks/DocsExamples' );

		cy.get( 'table > tbody' ).children()
			.then( $kids => {

				expect( $kids ).to.be.of.length( 33, 'Correct length' );

				filenames.forEach( ( name, index ) => {

					expect( $kids[ index ].children[ 0 ] ).to.contain.text( name, `Found file: ${name}` );
					expect( $kids[ index ].children[ 1 ] ).to.contain.text( results[ index ], `Found result: ${results[ index ]}` );

				} );

			} );

	} );

	it( 'checks/DocsExternals (1908f394……)', () => {

		const results = {
			'docs/api/en/extras/core/Curve.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 82)`,
			'docs/api/en/geometries/TextGeometry.html': `Error: Expected " ", "]", or [a-zA-Z0-9_.] but "-" found. (line 18)`,
			'docs/api/en/math/Quaternion.html': `http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors`,
			'docs/api/en/Template.html': `https://github.com/mrdoob/three.js/blob/master/src/Template.js`,
			'docs/api/zh/animation/AnimationAction.html': `Error: Expected [ \\t\\r\\n] or [a-zA-Z0-9_.] but "重" found. (line 271)`,
			'docs/api/zh/core/BufferGeometry.html': `Error: Expected " " or [a-zA-Z0-9_.] but "]" found. (line 184)`,
			'docs/api/zh/extras/core/Curve.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 82)`,
			'docs/api/zh/geometries/DodecahedronGeometry.html': `Error: Expected " ", ".js", "[", "]", [:/\\-()#=], [:/\\-], or [a-zA-Z0-9_.] but "\\n" found. (line 57)`,
			'docs/api/zh/materials/Material.html': `Error: Expected " ", "]", or [a-zA-Z0-9_.] but "\\n" found. (line 52)`,
			'docs/api/zh/math/Color.html': `Error: Expected "." or [a-zA-Z0-9_.] but " " found. (line 220)`,
			'docs/api/zh/math/Quaternion.html': `http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors`,
			'docs/api/zh/Template.html': `https://github.com/mrdoob/three.js/blob/master/src/Template.js`,
			'docs/examples/en/animations/CCDIKSolver.html': `Error: Expected "." or [a-zA-Z0-9_.] but " " found. (line 61)`,
			'docs/examples/en/loaders/MTLLoader.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 63)`,
			'docs/examples/en/loaders/OBJLoader2.html': `Error: Expected "]", [ \\t\\r\\n], or [a-zA-Z0-9_.] but "-" found. (line 140)`,
			'docs/examples/en/math/Lut.html': `https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/en/math/Lut.js`,
			'docs/examples/zh/animations/CCDIKSolver.html': `Error: Expected "." or [a-zA-Z0-9_.] but " " found. (line 61)`,
			'docs/examples/zh/loaders/MTLLoader.html': `Error: Expected "]", [ \\t], or [a-zA-Z0-9_.] but "," found. (line 63)`,
			'docs/examples/zh/loaders/OBJLoader2.html': `Error: Expected "]", [ \\t\\r\\n], or [a-zA-Z0-9_.] but "-" found. (line 140)`,
			'docs/examples/zh/math/Lut.html': `https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/zh/math/Lut.js`,
			'docs/manual/en/buildTools/Testing-with-NPM.html': `https://www.npmjs.org/doc/json.html`,
			'docs/manual/en/introduction/How-to-run-things-locally.html': `http://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration`,
			'docs/manual/en/introduction/Useful-links.html': `Error: Expected " ", ".js", "[", "]", [:/\\-()#=], [:/\\-], or [a-zA-Z0-9_.] but "?" found. (line 127)`,
			'docs/manual/zh/introduction/How-to-run-things-locally.html': `http://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration`,
			'docs/manual/zh/introduction/Matrix-transformations.html': `Error: Expected "]", [ \\t\\r\\n], or [a-zA-Z0-9_.] but "(" found. (line 57)`,
			'docs/manual/zh/introduction/Useful-links.html': `Error: Expected " ", ".js", "[", "]", [:/\\-()#=], [:/\\-], or [a-zA-Z0-9_.] but "?" found. (line 128)`
		};

		cy.visit( '/#/runs/2/checks/DocsExternals' );

		cy.get( 'table > tbody' ).children()
			.then( $kids => {

				expect( $kids ).to.be.of.length( Object.keys( results ).length, 'Correct length' );

				Object.entries( results ).forEach( ( [ name, text ], index ) => {

					expect( $kids[ index ].children[ 0 ] ).to.be.text( name, `Found file: ${name}` );
					expect( $kids[ index ].children[ 1 ] ).to.be.text( text, `Found result: ${text}` );

				} );

			} );

	} );

	it( 'checks/NonDocsExternals (1908f394……)', () => {

		const results = {
			'examples/js/libs/chevrotain.min.js': 'https://unpkg.com/chevrotain@',
			'examples/jsm/libs/chevrotain.module.min.js': 'https://unpkg.com/chevrotain@',
			'examples/jsm/webxr/XRControllerModelFactory.js': 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles',
			'examples/webgl_animation_keyframes.html': 'https://www.artstation.com/artwork/1AGwX',
			'examples/webgl_geometry_extrude_splines.html': 'http://www.lab4games.net/zz85/blog',
			'examples/webgl_geometry_text.html': 'http://www.lab4games.net/zz85/blog',
			'examples/webgl_lensflares.html': 'http://ro.me',
			'examples/webgl_lights_hemisphere.html': 'http://ro.me',
			'examples/webgl_lights_pointlights.html': 'http://davidoreilly.com/post/18087489343/disneyhead',
			'examples/webgl_lines_colors.html': 'http://www.openprocessing.org/visuals/?visualID=15599',
			'examples/webgl_loader_amf.html': 'https://github.com/tamarintech',
			'examples/webgl_loader_assimp.html': 'https://virtulo.us',
			'examples/webgl_loader_md2_control.html': 'http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=556',
			'examples/webgl_loader_md2.html': 'http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=368',
			'examples/webgl_loader_pcd.html': 'http://filipecaixeta.com.br',
			'examples/webgl_loader_ply.html': 'http://people.sc.fsu.edu/~jburkardt/data/ply/ply.html',
			'examples/webgl_materials_bumpmap.html': 'http://graphics.cs.williams.edu/data/meshes.xml#14',
			'examples/webgl_materials_cubemap.html': 'http://davidoreilly.com/post/18087489343/disneyhead',
			'examples/webgl_materials_envmaps.html': 'http://gl.ict.usc.edu/Data/HighResProbes/',
			'examples/webgl_materials_modified.html': 'http://graphics.cs.williams.edu/data/meshes.xml#14',
			'examples/webgl_materials_normalmap.html': 'http://graphics.cs.williams.edu/data/meshes.xml#14',
			'examples/webgl_materials_parallaxmap.html': 'http://sunandblackcat.com/tipFullView.php?topicid=28',
			'examples/webgl_materials_standard.html': 'http://www.polycount.com/forum/showthread.php?t=130641',
			'examples/webgl_morphtargets_horse.html': 'http://ro.me',
			'examples/webgl_postprocessing_advanced.html': 'http://g3d.cs.williams.edu/g3d/data10/index.html#mesh19',
			'examples/webgl_shadowmap_performance.html': 'http://ro.me',
			'examples/webgl_shadowmap.html': 'http://ro.me',
			'examples/webgl_skinning_simple.html': 'https://github.com/mrdoob/three.js/blob/master/examples/models/skinned/simple/simple.blend',
			'src/math/MathUtils.d.ts': 'https://github.com/mrdoob/three.js/blob/master/src/math/Math.js',
			'src/objects/Points.d.ts': 'https://github.com/mrdoob/three.js/blob/master/src/objects/ParticleSystem.js',
		};

		cy.visit( '/#/runs/2/checks/NonDocsExternals' );

		cy.get( 'table > tbody' ).children()
			.then( $kids => {

				expect( $kids ).to.be.of.length( Object.keys( results ).length, 'Correct length' );

				Object.entries( results ).forEach( ( [ name, text ], index ) => {

					expect( $kids[ index ].children[ 0 ] ).to.be.text( name, `Found file: ${name}` );
					expect( $kids[ index ].children[ 1 ] ).to.be.text( text, `Found result: ${text}` );

				} );

			} );

	} );

	it( 'checks/SrcDecl (1908f394……)', () => {

		const results = {
			'src/renderers/shaders/ShaderChunk.js': {
				'declaration': [
					'lights_pars_map',
					'normal_flip'
				],
				'source': [
					'fog_vertex',
					'fog_pars_vertex',
					'gradientmap_pars_fragment',
					'lights_toon_fragment',
					'lights_toon_pars_fragment',
					'dithering_fragment',
					'dithering_pars_fragment',
					'background_frag',
					'background_vert',
					'meshmatcap_frag',
					'meshmatcap_vert',
					'meshtoon_frag',
					'meshtoon_vert',
					'sprite_frag',
					'sprite_vert'
				]
			},
			'src/renderers/shaders/ShaderLib.js': {
				'declaration': [],
				'source': [
					'toon'
				]
			},
			'src/renderers/shaders/UniformsLib.js': {
				'declaration': [
					'lights.hemisphereLights.properties.skycolor'
				],
				'source': [
					'lights.lightProbe.value',
					'lights.pointLightShadows.properties.shadowCameraNear',
					'lights.pointLightShadows.properties.shadowCameraFar',
					'lights.hemisphereLights.properties.skyColor',
					'points.alphaMap.value',
					'sprite.diffuse.value',
					'sprite.opacity.value',
					'sprite.center.value',
					'sprite.rotation.value',
					'sprite.map.value',
					'sprite.alphaMap.value',
					'sprite.uvTransform.value'
				]
			}
		};

		cy.visit( '/#/runs/2/checks/SrcDecl' );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', Object.keys( results ).length );

		for ( const filename of Object.keys( results ) ) {

			cy.get( '[data-cy=files-list-item-text]' )
				.contains( filename )
				.should( 'have.length', 1 )
				.click();
			// .then( $el => expect( $el.parent() ).to.have.class( 'active' ) );

			cy.get( '[data-cy=properties-table]' ).should( 'be.visible' );

			for ( const decl of results[ filename ].declaration )
				cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', decl );

			for ( const src of results[ filename ].source )
				cy.get( '[data-cy=properties-table] [data-cy=data-column]' ).should( 'contain.text', src );

		}

	} );

	it( 'checks/ScanCompletion (1908f394……)', () => {

		cy.visit( '/#/runs/2/checks/ScanCompletion' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/TSCompiler (1908f394……)', () => {

		cy.visit( '/#/runs/2/checks/TSCompiler' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/UnitTests (1908f394……)', () => {

		cy.visit( '/#/runs/2/checks/UnitTests' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'checks/LawVsReality (1908f394……)', () => {

		cy.visit( '/#/runs/2/checks/LawVsReality' );

		// TODO:

		throw new Error( "TODO" );

	} );

} );

