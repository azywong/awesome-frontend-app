var app = angular.module('quiz', []);

  app.controller('QuizCtrl', function($scope, $http){
    $scope.currentQuizId = 0;
    $scope.currentQuestion = {};

    $scope.getFirstQuiz = function(){
      var self = this;
      $http.get('/quizzes.json').success(function(data){
        console.log(data.quizzes[0].quiz_id);
        self.currentQuizId = data.quizzes[0].quiz_id;
      });
    }

    $scope.getNextQuestion = function(){
      var self = this;
      $http.get('/quizzes/' + this.currentQuizId + '/questions/next').success(function(data){
        $scope.currentQuestion = data.question;
      });
    };

    $scope.getFirstQuiz();
  });


