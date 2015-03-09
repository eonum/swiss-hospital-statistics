module Api
  module V1
    class CodesController < ApplicationController

      include Parsers

      def index
        # put code to play with here
        # Parsers::SuDParser.new.parse
=begin
          if static methods are an option use this
          if not use an object instead
=end
        @test = ChopCode.to_json
        print @test
        render json: @test
      end

      def show
        render json: {
                   codes: {
                       params[:id].parameterize.underscore.to_sym => {
                           description: "Chop code is tzpe of caode that bla bla haba",
                           codes: [
                               {
                                   code: "001200",
                                   description: "Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden"
                               },
                               {
                                   code: "0033",
                                   description: "Computergesteuerte Chirurgie mit Fluoroskopie"
                               }
                           ]
                       }
                   }
               }
      end
    end
  end
end