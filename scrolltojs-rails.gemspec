# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'scrolltojs/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "scrolltojs-rails"
  spec.version       = Scrolltojs::Rails::VERSION
  spec.authors       = ["Ilton Garcia dos Santos Silveira"]
  spec.email         = ["ilton_unb@hotmail.com"]

  spec.summary       = 'For more infos & how to use the jQuery ScrollTo PlugIn visit: http://jquery-plugins.net/scroll-to-simple-way-to-animate-to-anchors'
  spec.description   = 'For more infos & how to use the jQuery ScrollTo PlugIn visit: http://jquery-plugins.net/scroll-to-simple-way-to-animate-to-anchors'
  spec.homepage      = "https://github.com/PageRentS"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

	spec.files = Dir["{lib,vendor}/**/*"] + ["README.md"]

  spec.add_development_dependency "bundler", "~> 1.8"
  spec.add_development_dependency "rake", "~> 10.0"
	spec.add_dependency "railties", "> 3.1", '< 5.0'
end
