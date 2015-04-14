(function(){

	brite.registerView("MainView",{parent:"body"}, {

		create: function(){
			return render("MainView",{userName:user.displayName});
		}, 

		init: function(){
			var view = this;
			// display the list view
			return brite.display("ProjectListView",view.$el.find(".MainView-leftPanel")).whenInit;
		},

		postDisplay: function(){
			var view = this;
			view.$contentPanel = view.$el.find(".MainView-contentPanel");
			
			
			$(function(){
				$.ajax('/das-list-user',{
					type : 'get',
					async:false,
					success : function(data){
						
						
						$(data.result).each(function(){
							
							$(".table tbody").append(
									$("<tr class='info'><td>"+this.id+"</td><td>"+this.username+"</td><td>"+this.age+"</td><td>"+this.sex+"</td></tr>")
							);
						});
						
					},
					
				});
				
			});
			
		}, 

		docEvents: {

			"APP_CTX_CHANGE": function(event){
				var view = this;
				if ("project" === app.ctx.pathAt(0) && $.isNumeric(app.ctx.pathAt(1))){
					view.projectId = app.ctx.pathAt(1) * 1;
					
					app.projectDao.get(view.projectId).done(function(project){
						// call the brite.js bEmpty jQuery extension to make sure to 
						// destroy eventual brite.js sub views
						view.$contentPanel.bEmpty();
						// display the projectt
						brite.display("ProjectView",view.$el.find(".MainView-contentPanel"),{project:project});
					});
				}
			}

		}

	});
	
	
	

})();
