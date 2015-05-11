require 'parsers/codes/su_code_parser'
require 'cascadable'

class Top3IcdParser < SuCodeParser

  def build
    self._
        .with { |composite|
          composite.tab._
              .from(0)
              .for(self.stream)
              .in(:tab)
              .repeat
              .with { |sheet|
                sheet.column._
                    .column(2)
                    .from(8)
                    .step(17)
                    .for(self.stream)
                    .in(:hospital)
                    .repeat
                    .with { |hospitals|
                        hospitals.box._
                          .column(hospitals.column - 1)
                          .row(hospitals.from)
                          .for(self.stream)
                          .repeated_row
                          .offset(1)
                          .in(:top3)
                    }
              }
        }
  end
end