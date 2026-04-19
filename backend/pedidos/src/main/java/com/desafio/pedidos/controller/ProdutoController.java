package com.desafio.pedidos.controller;

import com.desafio.pedidos.dto.ProdutoDTO;
import com.desafio.pedidos.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;
    
    @PostMapping
    public ResponseEntity<ProdutoDTO> criarProduto(@Valid @RequestBody ProdutoDTO produtoDTO) {
        ProdutoDTO created = produtoService.criarProduto(produtoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> editarProduto(@PathVariable Long id, @Valid @RequestBody ProdutoDTO produtoDTO) {
        ProdutoDTO updated = produtoService.editarProduto(id, produtoDTO);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listarProdutos() {
        return ResponseEntity.ok(produtoService.listarProdutos());
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<ProdutoDTO>> buscarProdutoPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(produtoService.buscarProdutoPorNome(nome));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        produtoService.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }
}