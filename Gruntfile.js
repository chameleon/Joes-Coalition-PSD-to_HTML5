/* I am Gruntfile.js.   I live in the ROOT of the web project along with package.json  
Tutorial: http://12devsofxmas.co.uk/2014/01/day-10-maintaining-a-better-workflow-with-grunt/


grunt foo:testing:123   runs  foo task with arguments 'testing' and '123'
a function in the foo task must handle those arguments... typcally with
an IF statement.  SEE Register tasks section
*/

module.exports = function(grunt) {

	
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),  //NOTE this comma


        watch: {
          options: {
		    spawn: false,
		      //livereload: true,  /* when running on localhost server */
		  },
		  css: {
		    files: ['app/styles/style.less'],
		    tasks: ['less', 'cssmin'],
		  
		  },
		  scripts: {
		  	files: ['app/scripts/script.js'],
		  	tasks: ['jshint', 'uglify'],  //or 'jshint','dev'
		  }
		},
		

		clean: {
			tmp: ["tmp/*"]
		},

        //Create Less tasks
        less: {
		  development: {
		    options: {
		      paths: ['assets/css']  //???????????
		    },
		    files: {
		    	// dest :  src
		      'tmp/styles/style.css': 'app/styles/style.less'
		    }
		  }/*,
	

		  production: {
		    options: {
		      paths: ['assets/css'],
		      plugins: [
		        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
		        new (require('less-plugin-clean-css'))(cleanCssOptions)
		      ],
		      modifyVars: {
		        imgPath: '"http://mycdn.com/path/to/images"',
		        bgColor: 'red'
		      }
		    },
		    files: {
		      'path/to/result.css': 'path/to/source.less'
		    }
		  }*/
		  	/*
				Ideas for production only:  
				-add Google Analytics code into js
				-remove all comments before minify

			*/
		},

		postcss_import: {
		    options: {
		      // Task-specific options go here. 
		    },
		    your_target: {
		      // Target-specific file lists and/or options go here. 
		    },
		},
/*		
		postcss: {
		    options: {
		      map: true, // inline sourcemaps 
		 
		      // or 
		      
		      map: {
		          inline: false, // save all sourcemaps as separate files... 
		          annotation: 'dist/css/maps/' // ...to the specified directory 
		      },
		 		
		      processors: [
		        require('pixrem')(), // add fallbacks for rem units 
		        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes 
		        require('cssnano')() // minify the result 
		      ]
		    },
		    dist: {
		      src: 'css/style.css'
		    }
		  },
		
*/
		/* Concat style.css with fonts css as 'style.css', then minify 
			DO NOT RUN cssmin BY ITSELF - NEED TO RUN less FIRST ALWAYS
			PREFER TO RUN cssbuild
		*/
		cssmin: {
			//should first clear the tmp folder.  
			//That is done in a seperate task clean:tmp  .
		  combine: {
		    files: {
		    	//     Combine RESULT  :  file + file
		      'tmp/styles/style.css': ['app/styles/robotoFont.css','tmp/styles/style.css']
		    }
		  },
		  		//  MINIFY 
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'tmp/styles',
		      src: ['style.css'],
		      dest: 'dist/styles',
		      ext: '.min.css'
		    }]
		  },
		},


		//CREATE A JSHINT SECTION TO CONFIG THAT AND ADD A TASK CALLED dev
        //this task will look for a .js files in /src/js subdirs and then run them through jshint
        jshint: {
            dev: {        
                //src: ['/src/js/**/*.js']
                src: ['app/scripts/script.js']
            }
        },  //COMMA  !!
		/* Minify js and drop in DIST folder */
		//jQuery comes first but really need to assemble with Require.js
		uglify: {
		  my_target: {
		    files: {  
		      'dist/scripts/script.min.js': ['app/scripts/jquery-2.1.4.min.js', 'app/scripts/script.js', 'app/scripts/jquery.scrollTo.min.js']
		      //Minify multiples.... concat!
		      //'js/script.min.js': ['js/script.js', 'js/input2.js']
		    }
		  }
		},

		htmlmin: {                                       // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                     // Dictionary of files
		        'dist/index.html': 'app/index.html'//,     // 'destination': 'source'
		        //'dist/contact.html': 'src/contact.html'  //add a comma above if adding more files to this list
		      }
		    }//,
		    /*
		    dev: {                                       // Another target
		      files: {
		        'dist/index.html': 'src/index.html',
		        'dist/contact.html': 'src/contact.html'
		      }
		    }
		    */
		},

		//to avoid having the progress of the upload written to console, 
		//change or remove the options.silent parameter.
		//Make sure path in files.dest are already exsit
		//If you are using ftp over SSL, secure must be true
		//Touch a file named .ftppass that contains your ftp username and password
		ftps_deploy: {
		    codetobeta: {
		      options: {
		        auth:{
		          host:'timestick.net',
		          port: 21,
		          authKey: 'key1',
		          secure: false
		        },
		        silent:false
		      },
		      files: [{
		        expand: true,
		        cwd:'dist',
		        src: ['index.html', 'styles/style.min.css', 'scripts/script.min.js' ],
		        //src: ['**/* ', '!**/*.html'],
		        dest: '/joeuxdesigner/beta'
		      }]
		    },

		    codetolive: {
		      options: {
		        auth:{
		          host:'timestick.net',
		          port: 21,
		          authKey: 'key1',
		          secure: false
		        },
		        silent:false
		      },
		      files: [{
		        expand: true,
		        cwd:'dist',
		        src: ['index.html', 'styles/style.min.css', 'scripts/script.min.js' ],
		        //src: ['**/* ', '!**/*.html'],
		        dest: '/joeuxdesigner'
		      }]
		    },

		    //deploy code + images/assets to beta server
		    // DOES NOT WORK YET -same as codetobeta right now
		    sitetobeta: {
		      options: {
		        auth:{
		          host:'timestick.net',
		          port: 21,
		          authKey: 'key1',
		          secure: false
		        },
		        silent:false
		      },
		      files: [{
		        expand: true,
		        cwd:'dist',
		        src: ['images/*', 'index.html', 'styles/style.min.css', 'scripts/script.min.js' ],
		        //src: ['**/* ', '!**/*.html'],
		        dest: '/joeuxdesigner/beta'
		      }]
		    },

		    //moves files from remote Beta server to remote Live server
		    // DOES NOT WORK YET
		    golive: {
		      options: {
		        auth:{
		          host:'timestick.net',
		          port: 21,
		          authKey: 'key1',
		          secure: false
		        },
		        silent:false
		      },
		      files: [{
		        expand: true,
		        cwd:'dist',   //////////////  placeholder
		        src: ['fonts/*'],
		        //src: ['**/* ', '!**/*.html'],
		        dest: '/joeuxdesigner/beta/fonts'
		      }]
		    },			   

		}, //END ftpsdeploy	


		  //This ftp script checks for diff before sending a file.
		ftpush: {
			build: {
			    auth: {
			      host: 'timestick.net',
			      port: 21,
			      authKey: 'key1'
			    },
			    src: 'dist/fonts',
			    dest: '/joeuxdesigner/beta/fonts',
			    exclusions: ['dist/fonts/.DS_Store', 'dist/fonts/Thumbs.db', 'dist/tmp'],
			    //keep: ['/important/images/at/server/*.jpg'],
			    simple:false  //true: In this mode ftpush won't delete any excessive files on the server. It won't even try to list what's on the server. Instead it will just make incremental upload of files that actually changed (
			}
		},
			
		push: {
            doixstudio: {
                options: {
                    username: "admin@timestick.net",
                    password: "Cami11i@s",
                    host: "timestick.net",
                    remoteBase: "joeuxdesigner/"
                },
                files: [{
                    expand: true,
                    cwd: 'dist/fonts',
                    src: ['**/*']
                    //exclude: ['.DS_Store','**/.DS_Store','.*', '**/.*']
                }]
            }
	    },	  
            //need grunt-contrib-copy     **/*
    });



		
    //load a contrib task
    /*  Use load-grunt-tasks instead of all these lines  */
    require('load-grunt-tasks')(grunt);
		/*
		    grunt.loadNpmTasks('grunt-contrib-watch');
		    grunt.loadNpmTasks('grunt-contrib-jshint');
		    grunt.loadNpmTasks('grunt-contrib-less');
		   		grunt.loadNpmTasks('grunt-postcss-import');
		    	grunt.loadNpmTasks('grunt-postcss');
			grunt.loadNpmTasks('grunt-contrib-cssmin');
		    grunt.loadNpmTasks('grunt-contrib-htmlmin');
		    grunt.loadNpmTasks('grunt-contrib-uglify');
			grunt.loadNpmTasks('grunt-ftps-deploy');
		*/

    // task setup    
    //grunt.registerTask('default', ['less','cssmin', 'uglify', 'htmlmin']); 
    grunt.registerTask('buildcss', ['clean:tmp','less','cssmin']);
    grunt.registerTask('build', ['clean:tmp','less','cssmin', 'uglify', 'htmlmin']);   
    
    /* FTP to server after build */
    /* use grunt-contrib-clean and grunt-contrib-copy to 
    empty build code folder INSTEAD of overwriting files
    */

    //publish html, css & js from dist to server beta via ftp
    grunt.registerTask('codetobeta', ['ftps_deploy:codetobeta']);
    grunt.registerTask('codetolive', ['ftps_deploy:codetolive']);
    
    //publish local code + images and other files, etc to Beta server
    grunt.registerTask('sitetobeta', ['ftps_deploy:sitetobeta', 'ftpush']);

    // Go live:  must go Beta first- Prod always come from Beta on live server.
    grunt.registerTask('golive', ['ftps_deploy:golive']);

    //BROKEN
    grunt.registerTask('push', ['push']);
    grunt.registerTask('ftpush', ['ftpush:build']);



    /*
    	// Want to eventually add vendor prefixes and maybe remove unused styles before
    	// concatinating and minifying.
    	grunt.registerTask('postcss', ['postcss']);
    */
  
    /*  Also, a Nice sample -f self-contained task with params  */
    grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
	  if (arguments.length === 0) {
	    grunt.log.writeln(this.name + ", no args");
	  } else {
	    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
	  }
	});

    
};