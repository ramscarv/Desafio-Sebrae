package com.desafio.pedidos.controller;

import com.desafio.pedidos.dto.PedidoDTO;
import com.desafio.pedidos.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @PostMapping
    public ResponseEntity<PedidoDTO> criarPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO created = pedidoService.criarPedido(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @GetMapping
    public ResponseEntity<List<PedidoDTO>> listarPedidos() {
        return ResponseEntity.ok(pedidoService.listarPedidos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> detalharPedido(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.detalharPedido(id));
    }
}