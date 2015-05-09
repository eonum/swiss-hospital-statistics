require 'parsers/codes/su_code_parser'
require 'cascadable'

class SuAgeParser < SuCodeParser

  def build
    self._
        .with { |composite|
          composite.tab._
              .from(1)
              .for(self.stream)
              .in(:sex)
              .index
              .transformed{|value|value.round.pred} # -1 to remove offset
              .repeat
              .with { |sheet|
                sheet.row._
                    .row(16)
                    .from(3)
                    .to(22)
                    .for(self.stream)
                    .in(:ages)
                    .merge
              }
              .with { |sheet|
                sheet.column._
                    .from(18)
                    .repeat
                    .with { |code|
                      code.row._
                          .row(code.from)
                          .from(1)
                          .to(2)
                          .for(self.stream)
                          .in(:code)
                          .merge
                    }
                    .with { |code|
                        code.row._
                            .row(code.from)
                            .from(code.column + 2)
                            .to(code.column + 21)
                            .for(self.stream)
                            .in(:age_values)
                            .transformed{|value| value ? value.round : 0}
                            .merge
                    }
              }
        }
  end
end